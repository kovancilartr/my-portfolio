"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { revalidatePath } from "next/cache";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

export function LoginForm() {
  const [formData, setFormData] = useState([]);

  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await signIn("credentials", {
      username: values.email, // 'email' yerine 'username' kullanın
      password: values.password,
      redirect: false, // Yönlendirmeyi devre dışı bırak
    });

    if (result?.error) {
      toast({
        variant: "destructive",
        title: "Üzgünüm kullanıcı adı veya şifre hatalı.",
        duration: 5000,
      });
    } else {
      toast({
        variant: "success",
        title: "Giriş başarılı, Yönlendirme yapılıyor.",
        onCustomAction: () => {
          setTimeout(() => {
            window.location.href = "/"; // 3 saniye bekledikten sonra ana sayfaya yönlendir
          }, 3000);
        },
      });
    }
  }

  return (
    <Card className="w-full max-w-sm p-2">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Giriş Paneli</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Adresi</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email adresiniz"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Şifreniz" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Giriş Yap
            </Button>
          </form>
        </Form>
      </CardContent>

      <Link href="/" className="font-roboto text-sm text-center">
        <h1>Ana Sayfaya geri dön</h1>
      </Link>
    </Card>
  );
}
