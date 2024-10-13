import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { createProjectData } from "@/actions/pb"; // createProjectData fonksiyonunu içe aktarın
import { Textarea } from "@/components/ui/textarea";

interface NewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateHeroModal({ isOpen, onClose }: NewModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [gitUrl, setGitUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProjectData({
        title,
        description,
        gitUrl,
        previewUrl,
        tags,
        image: image,
      });
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Yeni Proje Ekle</DialogTitle>
          <DialogDescription>
            Proje bilgilerini buradan ekleyebilirsiniz.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Başlık
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Açıklama
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="gitUrl" className="text-right">
                Git URL
              </Label>
              <Input
                id="gitUrl"
                value={gitUrl}
                onChange={(e) => setGitUrl(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="previewUrl" className="text-right">
                Önizleme URL
              </Label>
              <Input
                id="previewUrl"
                value={previewUrl}
                onChange={(e) => setPreviewUrl(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tags" className="text-right">
                Etiketler (virgülle ayırın)
              </Label>
              <Input
                id="tags"
                value={tags.join(", ")} // Etiketleri virgülle ayırarak gösterin
                onChange={(e) =>
                  setTags(e.target.value.split(",").map((tag) => tag.trim()))
                } // Etiketleri güncelleyin
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Resim Yükle
              </Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files) {
                    setImage(e.target.files[0]); // Seçilen resmi state'e kaydedin
                  }
                }}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Kaydet</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
