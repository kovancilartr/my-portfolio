"use client";
import { fetchHeroData } from "@/actions/pb";
import CreateHeroModal from "@/app/(admin)/_components/create/CreateHeroModal";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
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
import { hero } from "@/types";
import { useEffect, useState } from "react";

export default function HeroPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [heroData, setHeroData] = useState<hero[]>([]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const actionHeroData = async () => {
      try {
        const data = await fetchHeroData();
        setHeroData(data);
        console.log("Hero Data:", data);
      } catch (error) {
        console.error(error);
      }
    };
    actionHeroData();
  }, []);
  return (
    <div>
      <div className="flex justify-end">
        <Button variant="ghost" size="sm" onClick={handleOpenModal}>
          Yeni Ekle
        </Button>
      </div>
      <CreateHeroModal isOpen={isModalOpen} onClose={handleCloseModal} />

      <Table className="border-2 mt-2 shadow-lg">
        <TableCaption>Hero Bölümü</TableCaption>
        <TableHeader>
          <TableRow className="bg-neutral-50 dark:bg-neutral-800">
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead className="text-center">Başlık</TableHead>
            <TableHead className="text-center">Açıklama</TableHead>
            <TableHead className="text-center">Alt başlık 1</TableHead>
            <TableHead className="text-center">Alt başlık 2</TableHead>
            <TableHead className="w-[100px]">Alt başlık 3</TableHead>
            <TableHead className="text-center">Buton Yazısı</TableHead>
            <TableHead className="text-center">Buton Bağlantısı</TableHead>
            <TableHead className="text-center">Fotoğraf</TableHead>
            <TableHead className="text-center">Durum</TableHead>
            <TableHead className="text-center">#</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {heroData.map((hero) => (
            <TableRow key={hero.id}>
              <TableCell className="font-medium">{hero.id}</TableCell>
              <TableCell className="text-center">{hero.title}</TableCell>
              <TableCell className="text-center">{hero.description}</TableCell>
              <TableCell className="text-center">
                {hero.subtitle1 ? hero.subtitle1 : "-"}
              </TableCell>
              <TableCell className="text-center">
                {hero.subtitle2 ? hero.subtitle2 : "-"}
              </TableCell>
              <TableCell className="text-center">
                {hero.subtitle3 ? hero.subtitle3 : "-"}
              </TableCell>
              <TableCell className="text-center">{hero.button_title}</TableCell>
              <TableCell className="text-center">{hero.button_url}</TableCell>
              <TableCell className="h-[80px] w-[80px]">
                <img
                  src={
                    "https://kovancilar.pockethost.io/api/files/" +
                    hero.collectionId +
                    "/" +
                    hero.id +
                    "/" +
                    hero.image
                  }
                  alt=""
                  className="w-full h-full object-cover rounded-full"
                />
              </TableCell>
              <TableCell>
                {hero.status ? "Aktif" : "Pasif"}
                <Switch id="airplane-mode" checked={hero.status} />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Düzenle
                  </Button>
                  <Button variant="outline" size="sm">
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
