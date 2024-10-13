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
import { useEffect, useState } from "react";
import { updateProjectData } from "@/actions/pb";
import { Textarea } from "@/components/ui/textarea";

interface NewModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProject: {
    id: string;
    title: string;
    description: string;
    gitUrl: string;
    previewUrl: string;
    tags: string[]; // Dizi olarak tanımlayın
  };
}

export default function UpdateProjectModal({
  isOpen,
  onClose,
  selectedProject,
}: NewModalProps) {
  const [title, setTitle] = useState(selectedProject.title);
  const [description, setDescription] = useState(selectedProject.description);
  const [gitUrl, setGitUrl] = useState(selectedProject.gitUrl);
  const [previewUrl, setPreviewUrl] = useState(selectedProject.previewUrl);
  const [tags, setTags] = useState<string[]>(selectedProject.tags || []); // Başlangıçta boş dizi

  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    // selectedProject değiştiğinde state'leri güncelle
    setTitle(selectedProject.title);
    setDescription(selectedProject.description);
    setGitUrl(selectedProject.gitUrl);
    setPreviewUrl(selectedProject.previewUrl);
    setTags(selectedProject.tags || []); // Başlangıçta boş dizi
  }, [selectedProject]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProjectData({
        projectId: selectedProject.id,
        title,
        description,
        gitUrl,
        previewUrl,
        tags,
        image: image,
      });
      onClose();
      window.location.reload(); // Sayfayı yenile
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{selectedProject.title} Projeyi Güncelle</DialogTitle>
          <DialogDescription>
            Proje ID bilgisi: {selectedProject.id}
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
              <p className="col-span-4 text-gray-500 text-xs text-center">
                Girilebilecek etiketler: "All", "Frontend", "Backend"
              </p>
              {/* Açıklama metni eklendi */}
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
