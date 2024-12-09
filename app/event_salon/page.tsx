"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // Composant Chadcn
import { Input } from "@/components/ui/input"; // Composant Chadcn
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

// Import des logos ou images des opérateurs
import Orangelogo from "@/assets/Orangelogo.png";
import Mtnlogo from "@/assets/Mtnlogo.png";

export default function PaymentForm() {
  const [operator, setOperator] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    payerNumber: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const { toast } = useToast(); // Utilisation de Chadcn pour les notifications

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = async () => {
    if (
      !formData.payerNumber ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !operator
    ) {
      toast({
        title: "Champs incomplets",
        description: "Veuillez remplir tous les champs avant de continuer.",
        variant: "destructive",
      });
      return;
    }

    const paymentData = {
      amount: 150000,
      currency: "XAF",
      motif:
        "Paiement pour participer à l'événement du concert au palais des sports de Yaoundé",
      reference: "ref00139i",
      phone: formData.payerNumber,
      operator: operator === "orange" ? "CM_OM" : "CM_MOMO",
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      lang: "fr",
    };

    try {
      setIsLoading(true); // Activer le loader
      const response = await fetch(
        "https://event-paiment.onrender.com/api/payments/initialize",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(paymentData),
        }
      );

      const result = await response.json();
      if (response.ok) {
        toast({
          variant: "default",
          title: "Paiement réussi",
          description: "Votre paiement a été initié avec succès !",
        });
        console.log("Réponse API:", result);
        // Réinitialiser les champs
        setFormData({
          payerNumber: "",
          firstName: "",
          lastName: "",
          email: "",
        });
        setOperator(null);
      } else {
        toast({
          title: "Échec du paiement",
          description: result.message || "Une erreur est survenue.",
          variant: "destructive",
        });
        console.error("Erreur API:", result);
      }
    } catch (error) {
      toast({
        title: "Erreur réseau",
        description:
          "Impossible de traiter votre demande. Réessayez plus tard.",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsLoading(false); // Désactiver le loader
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-md shadow-lg space-y-4">
      <h1 className="text-xl font-bold text-center text-gray-800">
        Paiement Mobile
      </h1>
      <p className="text-center text-gray-600">
        Sélectionnez votre opérateur et remplissez les informations pour initier
        le paiement.
      </p>

      {/* Sélection de l'opérateur */}
      <div className="flex justify-between space-x-4">
        <div
          onClick={() => setOperator("orange")}
          className={` ${
            operator === "orange"
              ? "border-2 scale-105  border-orange-500 animate-pulse"
              : "border-2 border-gray-300"
          } w-[150px] h-[150px] rounded-lg`}
        >
          <Image
            src={Orangelogo}
            alt="Orange Logo"
            width={150}
            height={150}
            className="rounded-lg"
          />
          {/* <span className="text-orange-500 font-semibold">Orange</span> */}
        </div>
        <div
          onClick={() => setOperator("mtn")}
          className={` ${
            operator === "mtn"
              ? "border-2 scale-105 border-yellow-500 animate-pulse"
              : "border-2 border-gray-300"
          } w-[150px] h-[150px] rounded-lg`}
        >
          <Image
            src={Mtnlogo}
            alt="MTN Logo"
            width={150}
            height={150}
            className="rounded-lg"
          />
          {/* <span className="text-yellow-500 font-semibold">MTN</span> */}
        </div>
      </div>

      {/* Formulaire de paiement */}
      {operator && (
        <>
          <div className="space-y-4">
            <p className="text-center text-3xl font-bold">150000 XAF</p>
            <Input
              placeholder="Numéro de téléphone (payeur)"
              name="payerNumber"
              value={formData.payerNumber}
              onChange={handleInputChange}
              className="w-full"
            />
            <Input
              placeholder="Prénom"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full"
            />
            <Input
              placeholder="Nom"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full"
            />
            <Input
              type="email"
              placeholder="Adresse email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>

          {/* Bouton de paiement avec loader */}
          <Button
            className="w-full bg-blue-600 text-white hover:bg-blue-700 mt-4 flex items-center justify-center"
            onClick={handlePayment}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
            ) : (
              "Payer maintenant"
            )}
          </Button>
        </>
      )}
    </div>
  );
}
