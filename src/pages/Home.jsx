import { useNavigate } from "react-router-dom";
import { Button } from "../components/common";
import { Image, Video, FolderOpen, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import heroBg from "../assets/hero-bg.jpg";
import { useAuth } from '../hooks/useAuth';

export default function Home() {

  const { user, setUser } = useAuth();
  const navigator = useNavigate();
  const handleGetStarted = () => {
    window.location.href = "https://cloudstorebackend-i2n1.onrender.com/auth/google";
  }
  const handleGetStartedforLoginUser = () => {
    navigator("/form");
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 -z-10 opacity-20"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-bg" />

        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-primary">
              Your Photos & Videos,{" "}
              <span className="text-primary">
                Beautifully Organized
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Store, organize, and share your precious memories with CloudStore.
              Create albums, upload unlimited photos and videos, all in one
              secure place.
            </p>
            
              <Button
                size="lg"
                onClick={ !user && handleGetStarted || user && handleGetStartedforLoginUser}

                name={'Upload Media'}
                className=""
              >
              </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need
            </h2>
            <p className="text-muted-foreground text-lg">
              Powerful features to organize and protect your memories
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Image,
                title: "Photos",
                description: "Upload and organize your photos with ease",
              },
              {
                icon: Video,
                title: "Videos",
                description: "Store and manage your video memories",
              },
              {
                icon: FolderOpen,
                title: "Albums",
                description: "Create custom albums for every occasion",
              },
              {
                icon: Shield,
                title: "Secure",
                description: "Your data is encrypted and protected",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl border bg-card hover:shadow-lg transition-all group"
              >
                <div className="mb-4 p-3 rounded-xl bg-primary/10 w-fit group-hover:bg-gradient-primary transition-all">
                  <feature.icon className="h-8 w-8 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
