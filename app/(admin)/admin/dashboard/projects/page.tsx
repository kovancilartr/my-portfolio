"use client";
import { deleteProjectData, fetchProjectData } from "@/actions/pb";
import CreateProjectModal from "@/app/(admin)/_components/create/CreateProjectModal";
import UpdateProjectModal from "@/app/(admin)/_components/update/UpdateProjectModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { projects } from "@/types";
import { useEffect, useState } from "react";

export default function HeroPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<projects | null>(null);
  const [projectData, setProjectData] = useState<projects[]>([]);

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };
  const handleOpenUpdateModal = () => {
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };
  const handleUpdateProject = async (project: projects) => {
    handleOpenUpdateModal();
    setSelectedProject(project);
  };
  const handleDeleteProject = async (projectId: string) => {
    try {
      await deleteProjectData(projectId);
      toast({
        title: "Proje silindi",
        description: "Proje başarıyla silindi",
        variant: "destructive",
        duration: 5000,
      });
      // Proje silindikten sonra sayfayı yeniden oluştur
      window.location.href = "/admin/dashboard/projects";
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  useEffect(() => {
    const actionProjectData = async () => {
      try {
        const data = await fetchProjectData();
        setProjectData(data);
        console.log("project Data:", data);
      } catch (error) {
        console.error(error);
      }
    };
    actionProjectData();
  }, []);

  return (
    <div>
      <div className="flex justify-end">
        <Button variant="ghost" size="sm" onClick={handleOpenCreateModal}>
          Yeni Ekle
        </Button>
      </div>
      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
      />
      <Table className="border-2 mt-2 shadow-lg">
        <TableCaption>Projects Bölümü</TableCaption>
        <TableHeader>
          <TableRow className="bg-neutral-50 dark:bg-neutral-800">
            <TableHead className="w-[100px] text-center">Id</TableHead>
            <TableHead className="text-center">Başlık</TableHead>
            <TableHead className="text-center">Açıklama</TableHead>
            <TableHead className="text-center">Git Url</TableHead>
            <TableHead className="text-center">Preview Url</TableHead>
            <TableHead className="text-center">Tags</TableHead>
            <TableHead className="text-center">Fotoğraf</TableHead>
            <TableHead className="text-center">#</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {projectData.map((project) => (
            <TableRow key={project.id}>
              <TableCell className="font-medium">{project.id}</TableCell>
              <TableCell className="text-center">{project.title}</TableCell>
              <TableCell className="text-center">
                {project.description}
              </TableCell>
              <TableCell className="text-center">
                {project.gitUrl ? project.gitUrl : "-"}
              </TableCell>
              <TableCell className="text-center">
                {project.previewUrl ? project.previewUrl : "-"}
              </TableCell>
              <TableCell className="text-center">
                {project.tags.map((tag) => (
                  <Badge variant={"destructive"}>{tag}</Badge>
                ))}
              </TableCell>
              <TableCell className="h-[80px] w-[80px]">
                <img
                  src={
                    "https://kovancilar.pockethost.io/api/files/" +
                    project.collectionId +
                    "/" +
                    project.id +
                    "/" +
                    project.image
                  }
                  alt=""
                  className="w-full h-full object-cover rounded-full"
                />
              </TableCell>
              <TableCell className="text-center">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUpdateProject(project)}
                  >
                    Düzenle
                  </Button>
                  {selectedProject && (
                    <UpdateProjectModal
                      isOpen={isUpdateModalOpen}
                      onClose={handleCloseUpdateModal}
                      selectedProject={selectedProject}
                    />
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteProject(project.id)}
                  >
                    Sil
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
