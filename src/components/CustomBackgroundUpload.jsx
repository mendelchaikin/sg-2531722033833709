import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

export default function CustomBackgroundUpload({ onUpload }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
    } else {
      toast({
        title: "Invalid File",
        description: "Please select an image file.",
        variant: "destructive",
      });
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "No File Selected",
        description: "Please select an image file to upload.",
        variant: "destructive",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      // Here you would typically send the formData to your server
      // For this example, we'll simulate a successful upload
      await new Promise(resolve => setTimeout(resolve, 1000));

      onUpload(URL.createObjectURL(file));
      toast({
        title: "Upload Successful",
        description: "Your custom background has been uploaded.",
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your file. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mt-4">
      <Input type="file" onChange={handleFileChange} accept="image/*" />
      <Button onClick={handleUpload} className="mt-2" disabled={!file}>
        Upload Custom Background
      </Button>
    </div>
  );
}