"use client";

import { useState } from "react";
import HeaderNavigation from "@/components/sections/header-navigation";
import CookieBanner from "@/components/sections/cookie-banner";
import HeroJunie from "@/components/sections/hero-junie";
import AudienceTabs, { type ActiveAudienceTab } from "@/components/sections/audience-tabs";
import DeveloperToolsGrid from "@/components/sections/developer-tools-grid";
import FeaturesCarousel from "@/components/sections/features-carousel";
import KotlinEcosystemBanner from "@/components/sections/kotlin-ecosystem-banner";
import TeamToolsSection from "@/components/sections/team-tools-section";
import CustomerTestimonials from "@/components/sections/customer-testimonials";
import TeamCityPipelinesBanner from "@/components/sections/teamcity-pipelines-banner";
import LanguageSupportCarousel from "@/components/sections/language-support-carousel";
import BusinessIdeServicesBanner from "@/components/sections/business-ide-services-banner";
import BusinessBenefitsGrid from "@/components/sections/business-benefits-grid";
import ComplianceSecurityBanner from "@/components/sections/compliance-security-banner";
import TrustedOrganizationsSection from "@/components/sections/trusted-organizations-section";
import DiscoverMoreCards from "@/components/sections/discover-more-cards";
import Footer from "@/components/sections/footer";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<ActiveAudienceTab>("developers");

  return (
    <div className="min-h-screen bg-black">
      <HeaderNavigation />
      
      <main>
        <HeroJunie />
        
        <AudienceTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {activeTab === "developers" && (
          <>
            <DeveloperToolsGrid />
            <FeaturesCarousel />
            <KotlinEcosystemBanner />
          </>
        )}
        
        {activeTab === "teams" && (
          <>
            <TeamToolsSection />
            <CustomerTestimonials />
            <TeamCityPipelinesBanner />
          </>
        )}
        
        {activeTab === "businesses" && (
          <>
            <BusinessIdeServicesBanner />
            <BusinessBenefitsGrid />
            <div className="bg-black py-16 sm:py-24">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <ComplianceSecurityBanner />
              </div>
            </div>
          </>
        )}
        
        <LanguageSupportCarousel />
        
        <TrustedOrganizationsSection />
        
        <DiscoverMoreCards />
      </main>
      
      <Footer />
      
      <CookieBanner />
    </div>
  );
}