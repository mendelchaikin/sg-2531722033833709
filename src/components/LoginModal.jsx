import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

const signupSchema = loginSchema.extend({
  name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
  role: z.enum(['user', 'admin']),
});

export default function LoginModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, signup } = useAuth();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: zodResolver(isLogin ? loginSchema : signupSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError('');
    try {
      if (isLogin) {
        await login(data.email, data.password);
      } else {
        await signup(data.name, data.email, data.password, data.role);
      }
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{isLogin ? 'Login' : 'Sign Up'}</DialogTitle>
              <DialogDescription>
                {isLogin ? 'Enter your credentials to login' : 'Create a new account'}
              </DialogDescription>
            </DialogHeader>
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
            >
              {!isLogin && (
                <div>
                  <Input {...register('name')} placeholder="Name" />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>
              )}
              <div>
                <Input {...register('email')} placeholder="Email" />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>
              <div>
                <Input {...register('password')} type="password" placeholder="Password" />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </div>
              {!isLogin && (
                <div>
                  <Select onValueChange={(value) => setValue('role', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
                </div>
              )}
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Loading...' : (isLogin ? 'Login' : 'Sign Up')}
              </Button>
            </motion.form>
            <Button variant="link" onClick={() => setIsLogin(!isLogin)} className="w-full mt-2">
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}