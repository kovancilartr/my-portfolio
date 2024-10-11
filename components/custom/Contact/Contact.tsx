"use client";

import { Terminal } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { Linkedin, LinkedinIcon } from "lucide-react";
import React, { useState } from "react";
import { BsGithub, BsGoogle, BsLinkedin } from "react-icons/bs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const [emailSubmited, setEmailSubmitted] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const data = {
      email: e.target.email.value,
      subject: e.target.subject.value,
      message: e.target.message.value,
    };

    const JsonData = JSON.stringify(data);
    const endpoint = "/api/send";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JsonData,
    };

    const response = await fetch(endpoint, options);
    const resData = await response.json();

    if (response.status === 200) {
      console.log("Message Success");
      setEmailSubmitted(true);
    }
  };

  return (
    <section id="contact" className="border-y-2 p-2 m-2">
      <div className="flex justify-center items-center text-2xl font-pacifico pt-2">
        İletişim
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 my-4 gap-5">
        <div className="col-span-1">
          <h5 className="textOne font-pacifico font-semibold mb-4 text-2xl">
            Lets Connect
          </h5>
          <p className="text-base textOne font-roboto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
            iste molestias nulla esse cum adipisci sint labore quasi id?
            Officiis optio tenetur error, nesciunt mollitia dolore aut sed
            obcaecati aliquam delectus atque quisquam excepturi aperiam eum
            maxime sit sint beatae exercitationem iure ipsa aliquid est nemo.
            Qui nihil inventore fugit.
          </p>

          <div className="flex flex-row gap-4 mt-5">
            <BsGithub className="h-10 w-10 textOne" />
            <BsLinkedin className="h-10 w-10 textOne" />
            <BsGoogle className="h-10 w-10 textOne" />
          </div>
        </div>

        <div className="col-span-1">
          {emailSubmited ? (
            <Alert className="bg-green-600 textOne">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                You can add components to your app using the cli.
              </AlertDescription>
            </Alert>
          ) : (
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <div className="mb-2 textOne">
                <Label>Mail Adresiniz</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Mail adresinizi yazınız."
                  required
                  className="bg-mycolor-600 text-white placeholder:text-slate-300 placeholder:font-roboto placeholder:text-xs"
                />
              </div>

              <div className="mb-2 textOne">
                <Label>Konu</Label>
                <Input
                  type="text"
                  name="subject"
                  placeholder="Konu"
                  required
                  className="bg-mycolor-600 text-white placeholder:text-slate-300 placeholder:font-roboto placeholder:text-xs"
                />
              </div>

              <div className="mb-2 textOne">
                <Label>Mesajınız</Label>
                <Textarea
                  name="message"
                  className="bg-mycolor-600 text-white placeholder:text-slate-300 placeholder:font-roboto placeholder:text-xs"
                  placeholder="İletmek istediğiniz mesajınızı yazınız."
                  required
                />
              </div>

              <Button
                type="submit"
                className="bg-black text-white font-bold hover:bg-mycolor-800 hover:text-black"
              >
                Gönder
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
