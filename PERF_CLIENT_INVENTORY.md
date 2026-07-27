# `'use client'` Inventory

## app (80)

| File | Reason | Top imports |
|------|--------|-------------|
| app/(public)/about/page.tsx | client-only component | import Link from 'next/link'; import Image from 'next/image'; import { ArrowRigh |
| app/(public)/contact/page.tsx | client-only component | import Link from 'next/link'; import { Marginalia } from '@/components/case-stud |
| app/(public)/heirloom/support/page.tsx | browser APIs: document |  |
| app/(public)/hero-lab/page.tsx | client-only component | import type { ReactNode } from 'react'; import { ASCIIShaderGrid } from '@/compo |
| app/(public)/home-lab/HomeLab.tsx | hooks: useState | import { useState } from 'react'; import type { WorkEra } from '@/lib/content/er |
| app/(public)/prototype-lab/page.tsx | hooks: useState; browser APIs: fetch | import { useState, lazy, Suspense } from 'react'; import Link from 'next/link';  |
| app/(public)/work/athletes-first/AthletesFirstDeckClient.tsx | dynamic import | import dynamic from 'next/dynamic'; |
| app/(public)/work/fair-embodied-ai/page.tsx | browser APIs: fetch | import Link from 'next/link'; import Image from 'next/image'; import { ProjectSc |
| app/(public)/work/framestore/FramestoreContent.tsx | client-only component | import Link from 'next/link'; import Image from 'next/image'; import { ProjectSc |
| app/(public)/work/fubo/FuboContent.tsx | client-only component | import Link from 'next/link'; import { ProjectScope } from '@/components/case-st |
| app/(public)/work/heirloom/evolution/page.tsx | client-only component | import Link from 'next/link'; import { ProjectScope } from '@/components/case-st |
| app/(public)/work/heirloom/page.tsx | client-only component | import './print.css'; import { lazy, Suspense } from 'react'; import Link from ' |
| app/(public)/work/nimbus/NimbusContent.tsx | client-only component | import Link from 'next/link'; import { ProjectScope } from '@/components/case-st |
| app/(public)/work/orion/page.tsx | client-only component | import Link from 'next/link'; import Image from 'next/image'; import { ProjectSc |
| app/(public)/work/rumi/RumiContent.tsx | client-only component | import Link from 'next/link'; import Image from 'next/image'; import { ProjectSc |
| app/(public)/work/silly-questions/page.tsx | client-only component | import Link from 'next/link'; import Image from 'next/image'; import { ProjectSc |
| app/(public)/work/spark-ar/page.tsx | client-only component | import Link from 'next/link'; import Image from 'next/image'; import { ProjectSc |
| app/(public)/work/studio-era/page.tsx | client-only component | import Link from 'next/link'; import Image from 'next/image'; import { ProjectSc |
| app/(public)/work/vault/VaultContent.tsx | hooks: useState | import { useState } from 'react'; import Link from 'next/link'; import { Project |
| app/(public)/work/viacom/page.tsx | browser APIs: document | import Link from 'next/link'; import Image from 'next/image'; import { ProjectSc |
| app/(public)/work/zero/components/HeroSection.tsx | client-only component | import Link from 'next/link' import { BetaSignupButton } from '@/components/beta |
| app/(public)/work/zero/components/OmnirepoArchitecture.tsx | client-only component |  |
| app/(public)/work/zero/components/PrototypeEmbed.tsx | client-only component | import { ZeroSequenceDemo } from '@/components/zero-sequence' import GalaxyBackg |
| app/(public)/work/zero/page.tsx | hooks: useState | import { useState } from 'react'; import Link from 'next/link'; import Image fro |
| app/(public)/writing/page.tsx | client-only component | import Link from 'next/link'; import { ArrowRight, ExternalLink } from 'lucide-r |
| app/admin/beta-signups/page.tsx | hooks: useState, useEffect; browser APIs: navigator, fetch | import { useEffect, useState } from 'react' import { getBetaSignups, serializeBe |
| app/admin/page.tsx | hooks: useEffect, useRouter | import { useEffect } from 'react'; import { useRouter } from 'next/navigation';  |
| app/admin/recipe-failures/page.tsx | hooks: useState, useEffect, useRouter; browser APIs: fetch | import { useEffect, useState } from 'react'; import { useRouter } from 'next/nav |
| app/clients/about/page.tsx | browser APIs: document | import Link from 'next/link'; import { OS8Window } from '@/components/visual-tes |
| app/clients/ar-ip-partners/page.tsx | client-only component | import Link from 'next/link'; import { ASCIIUnifiedGrid } from '@/components/vis |
| app/clients/contact/page.tsx | hooks: useState, useEffect; browser APIs: fetch | import { useState, useEffect } from 'react'; import { OS8Window } from '@/compon |
| app/clients/creait/investor-portal/InvestorPortalContent.tsx | hooks: useState; browser APIs: window, document, sessionStorage | import { useState } from 'react'; import { CRESection, CRECard } from '@/compone |
| app/clients/creait/investor-portal/page.tsx | hooks: useState, useEffect; browser APIs: document, sessionStorage | import { useState, useEffect } from 'react'; import { CRESection, CRECard } from |
| app/clients/creait/page.tsx | browser APIs: document | import Link from 'next/link'; import { Map } from 'lucide-react'; |
| app/clients/creait/pitch/page.tsx | dynamic import | import dynamic from 'next/dynamic'; |
| app/clients/creait/strategic-roadmap/page.tsx | hooks: useState, useEffect; browser APIs: window; dynamic import | import React, { useState } from 'react'; import { strategicRoadmap, type Slide } |
| app/clients/dashboard-access/page.tsx | hooks: useState, useSearchParams; browser APIs: document, fetch | import { useState, Suspense } from 'react'; import { useSearchParams } from 'nex |
| app/clients/founder/page.tsx | client-only component | import Link from 'next/link'; import { OS8Window } from '@/components/visual-tes |
| app/clients/home/page.tsx | browser APIs: document | import Link from 'next/link'; import { OS8Window } from '@/components/visual-tes |
| app/clients/how-we-work/page.tsx | client-only component | import Link from 'next/link'; import { OS8Window } from '@/components/visual-tes |
| app/clients/invest/amplify/page.tsx | browser APIs: window, document | import Link from 'next/link'; import { OS8Window } from '@/components/visual-tes |
| app/clients/invest/atlas/page.tsx | browser APIs: window, document | import Link from 'next/link'; import { OS8Window } from '@/components/visual-tes |
| app/clients/invest/page.tsx | browser APIs: document | import Link from 'next/link'; import { OS8Window } from '@/components/visual-tes |
| app/clients/invest/studio/page.tsx | browser APIs: document | import Link from 'next/link'; import { OS8Window } from '@/components/visual-tes |
| app/clients/investors/deck/page.tsx | client-only component | import Link from 'next/link'; import { Container, Section } from '@/components/l |
| app/clients/investors/page.tsx | client-only component | import Link from 'next/link'; import { OS8Window } from '@/components/visual-tes |
| app/clients/login-debug/page.tsx | hooks: useState, useEffect; browser APIs: localStorage | import { useState, useEffect } from 'react'; import { Container } from '@/compon |
| app/clients/login/page.tsx | hooks: useState, useSearchParams, useRouter; browser APIs: window, localStorage | import { useState, Suspense } from 'react'; import { useRouter, useSearchParams  |
| app/clients/page.tsx | hooks: useState, useEffect, useRouter | import { useEffect, useState } from 'react'; import { useRouter } from 'next/nav |
| app/clients/partnerships/page.tsx | hooks: useState | import { useState } from 'react'; import Link from 'next/link'; import { OS8Wind |
| app/clients/ventures/page.tsx | browser APIs: document | import Link from 'next/link'; import { OS8Window } from '@/components/visual-tes |
| app/clients/work/fubo/page.tsx | browser APIs: document | import Link from 'next/link'; import { BaseCard, BaseCardContent, BaseCardTitle  |
| app/clients/zero/InteractiveDemoWrapper.tsx | dynamic import | import dynamic from 'next/dynamic'; |
| app/clients/zero/app-store-guide/page.tsx | hooks: useState; browser APIs: navigator | import { appStoreMetadata, appStoreChecklist, keywordStrategy, abTestingPlan } f |
| app/clients/zero/dashboard/page.tsx | client-only component | import Link from 'next/link'; import { OnboardingProgressTracker } from '@/compo |
| app/clients/zero/investor/business/page.tsx | client-only component | import { Container, Section } from '@/components/layout'; import { GlassCard } f |
| app/clients/zero/investor/page.tsx | client-only component | import { Container, Section } from '@/components/layout'; import { GlassCard } f |
| app/clients/zero/investor/roadmap/page.tsx | client-only component | import Link from 'next/link'; import { Container, Section } from '@/components/l |
| app/clients/zero/investor/technical/page.tsx | client-only component | import { Container, Section } from '@/components/layout'; import { GlassCard } f |
| app/clients/zero/shader-test/page.tsx | hooks: useState; dynamic import | import { useState } from 'react'; import Link from 'next/link'; import dynamic f |
| app/clients/zero/tracker/page.tsx | hooks: useState | import { useState } from 'react'; import { useProjects, useCheckpoints, useWeeks |
| app/docs/firebase-admin-setup/page.tsx | client-only component | import Link from 'next/link'; import { Container } from '@/components/layout'; i |
| app/login/page.tsx | hooks: useState, useSearchParams, useRouter | import { useState, Suspense } from 'react'; import { useRouter, useSearchParams  |
| app/logout/page.tsx | hooks: useState, useEffect, useRouter; browser APIs: window | import { useEffect, useState } from 'react'; import { useRouter } from 'next/nav |
| app/owner/content/blog/page.tsx | client-only component | import Link from 'next/link'; import { FileText, Clock, Tag } from 'lucide-react |
| app/owner/content/case-studies/page.tsx | client-only component | import Link from 'next/link'; import { Folder, FileText } from 'lucide-react'; |
| app/owner/content/page.tsx | browser APIs: document | import Link from 'next/link'; import { FileText, Folder, Share2 } from 'lucide-r |
| app/owner/content/social/page.tsx | client-only component | import Link from 'next/link'; import { Share2, Image, MessageSquare } from 'luci |
| app/owner/heirloom/_components/EmbedFrame.tsx | hooks: useState | import { useState } from 'react'; import { Loader2 } from 'lucide-react'; |
| app/owner/heirloom/_components/Sidebar.tsx | hooks: usePathname | import Link from 'next/link'; import { usePathname } from 'next/navigation'; imp |
| app/owner/heirloom/financials/page.tsx | hooks: useState | import { useState } from 'react'; import { EmbedFrame } from '../_components'; |
| app/owner/heirloom/page.tsx | hooks: useState, useEffect; browser APIs: fetch | import { useState, useEffect } from 'react'; import { Download, DollarSign, Star |
| app/owner/outbound/page.tsx | hooks: useState; browser APIs: window, navigator | import { useState } from 'react'; import Link from 'next/link'; import { Contain |
| app/owner/page.tsx | browser APIs: document | import Link from 'next/link'; import { FileText, Book, Zap, TrendingUp, Clock, F |
| app/owner/reference/agents/page.tsx | client-only component | import Link from 'next/link'; import { Cpu, Zap } from 'lucide-react'; |
| app/owner/reference/page.tsx | browser APIs: document | import Link from 'next/link'; import { Cpu, BookOpen, FileCode } from 'lucide-re |
| app/owner/reference/playbooks/page.tsx | browser APIs: document | import Link from 'next/link'; import { BookOpen, CheckCircle } from 'lucide-reac |
| app/owner/reference/templates/page.tsx | browser APIs: document | import Link from 'next/link'; import { FileCode, Download } from 'lucide-react'; |
| app/owner/site-admin/page.tsx | hooks: useState, useEffect; browser APIs: document, localStorage, fetch | import { useState, useEffect } from 'react'; import { Search, Trash2, Archive, E |
| app/owners/outbound-tracker/page.tsx | hooks: useState | import { useState } from 'react'; import { ASCIIUnifiedGrid } from '@/components |

## components (319)

| File | Reason | Top imports |
|------|--------|-------------|
| components/GlitchText.tsx | hooks: useState | import { ReactNode, useState } from 'react'; |
| components/analytics/PostHogProvider.tsx | hooks: useEffect, usePathname, useSearchParams; browser APIs: window, document | import { Suspense, useEffect, type ReactNode } from 'react'; import { usePathnam |
| components/analytics/ScrollDepthTracker.tsx | hooks: useEffect, usePathname; browser APIs: window, document | import { useEffect } from 'react'; import { usePathname } from 'next/navigation' |
| components/analytics/TrackedIframe.tsx | hooks: useEffect, useRef; browser APIs: window, document | import { useEffect, useRef, type IframeHTMLAttributes } from 'react'; import pos |
| components/athletes-first/AISTSimulator.tsx | hooks: useState | import { useState } from "react"; import { motion, AnimatePresence } from "frame |
| components/athletes-first/AgentToolkit.tsx | hooks: useState | import { useState } from "react"; import { motion } from "framer-motion"; import |
| components/athletes-first/AthletesFirstPitchDeck.tsx | hooks: useState, useEffect; browser APIs: window, document, localStorage; dynamic import | import { useState, useEffect } from 'react'; import { getAllSectionsV2, Section, |
| components/athletes-first/CompactTimeline.tsx | hooks: useState | import { useState } from 'react'; import { AF_COLORS } from '@/lib/athletes-firs |
| components/athletes-first/DemoOnboarding.tsx | hooks: useState, useEffect; browser APIs: localStorage | import { useState, useEffect } from 'react'; import { X, MousePointer2, Hand, Zo |
| components/athletes-first/KeyboardHints.tsx | hooks: useState, useEffect; browser APIs: window, navigator, localStorage | import { useState, useEffect } from 'react'; import { ArrowLeft, ArrowRight, Arr |
| components/athletes-first/ModuleFlowProgress.tsx | client-only component |  |
| components/athletes-first/ModulesIntroSlide.tsx | client-only component |  |
| components/athletes-first/ModulesOverviewSlide.tsx | client-only component | import { InteractiveCard } from '@/components/presentation'; |
| components/athletes-first/PerformanceOptimizer.tsx | hooks: useState, useEffect; browser APIs: window | import { useEffect, useState } from 'react'; |
| components/athletes-first/PhaseBadge.tsx | client-only component |  |
| components/athletes-first/PilotTimelineSlide.tsx | client-only component | import { TimelineRoadmap, type TimelineItem } from '@/components/presentation'; |
| components/athletes-first/RotateDeviceOverlay.tsx | client-only component | import { RotateCw } from 'lucide-react'; |
| components/athletes-first/TabbedDemo.tsx | hooks: useState; dynamic import | import { useState } from 'react'; import { DemoTab } from '@/lib/athletes-first/ |
| components/athletes-first/WelcomeSlide.tsx | hooks: useState, useEffect; browser APIs: window | import { useEffect, useState } from 'react'; |
| components/athletes-first/context/DigitalTwinContext.tsx | hooks: useState, useContext | import { createContext, useContext, useState, ReactNode } from 'react'; |
| components/athletes-first/demos/AISTSimulatorDemo.tsx | client-only component | import AISTSimulator from '../AISTSimulator'; |
| components/athletes-first/demos/AgentToolkitDemo.tsx | client-only component | import AgentToolkit from '../AgentToolkit'; |
| components/athletes-first/demos/AmplifyAIDemo.tsx | hooks: useState, useEffect | import { useState, useEffect } from 'react'; import { ChevronLeft, ChevronRight, |
| components/athletes-first/demos/AthleteDashboardDemo.tsx | hooks: useState | import React, { useState } from 'react'; import { import { useOrientation } from |
| components/athletes-first/demos/BrandCampaignDemo.tsx | hooks: useState | import { useState } from 'react'; import { Sparkles, Wand2, Play } from 'lucide- |
| components/athletes-first/demos/ContractModelingCanvas.tsx | hooks: useState, useEffect, useRef; browser APIs: window | import { useEffect, useRef, useState } from 'react'; |
| components/athletes-first/demos/ContractModelingMobile.tsx | hooks: useState | import { useState } from 'react'; |
| components/athletes-first/demos/DigitalTwinsDemo.tsx | hooks: useState | import { useState } from 'react'; import { ChevronDown, Upload, Check, X } from  |
| components/athletes-first/demos/ImmersivePitchDemo.tsx | hooks: useState; dynamic import | import { useState } from 'react'; import { ButtonPrimary } from '@/components/ui |
| components/athletes-first/demos/NILAnalyzerDemo.tsx | hooks: useState | import { useState } from 'react'; import { AlertTriangle, Lightbulb, DollarSign, |
| components/athletes-first/demos/PlatformWalkthroughDemo.tsx | hooks: useState, useEffect | import React, { useState } from 'react'; import { import { useOrientation } from |
| components/athletes-first/demos/RecruitAIDemo.tsx | hooks: useState | import { useState } from 'react'; import { ChevronLeft, ChevronRight, ChevronDow |
| components/athletes-first/demos/RosterCampaignDemo.tsx | hooks: useState | import { useState } from 'react'; import { ChevronLeft, ChevronRight, Upload, Wa |
| components/athletes-first/demos/SystemArchitectureDemo.tsx | hooks: useState | import React, { useState } from 'react'; import { import { TransformWrapper, Tra |
| components/athletes-first/demos/UnifiedPitchExperience.tsx | hooks: useState, useEffect; browser APIs: window | import { useState, useEffect } from 'react'; import ContractModelingCanvas from  |
| components/athletes-first/demos/UnifiedVideoDigitalTwinsDemo.tsx | hooks: useState, useEffect; browser APIs: window | import { useState, useEffect } from 'react'; import DigitalTwinsDemo from './Dig |
| components/athletes-first/demos/VisionProSpatialDemo.tsx | hooks: useState | import { useState } from 'react'; |
| components/athletes-first/diagrams/AIAdoptionCurveDiagram.tsx | hooks: useEffect, useRef; browser APIs: window | import { useEffect, useRef } from 'react'; import { TYPE, SPACING, COLORS, getFo |
| components/athletes-first/diagrams/AdoptionWindowDiagram.tsx | hooks: useEffect, useRef; browser APIs: window | import { useEffect, useRef } from 'react'; import { TYPE, SPACING, COLORS, getFo |
| components/athletes-first/diagrams/AgencyParadoxDiagram.tsx | hooks: useEffect, useRef; browser APIs: window | import { useEffect, useRef } from 'react'; import { TYPE, SPACING, COLORS, getFo |
| components/athletes-first/diagrams/AgencyParadoxDiagramMobile.tsx | client-only component |  |
| components/athletes-first/diagrams/AgencyParadoxDiagramResponsive.tsx | dynamic import | import { useIsMobile } from '@/hooks/useMediaQuery'; import dynamic from 'next/d |
| components/athletes-first/diagrams/AgencyParadoxMatrix.tsx | client-only component |  |
| components/athletes-first/diagrams/AmplifyAIProcessDiagram.tsx | hooks: useEffect, useRef; browser APIs: window | import { useEffect, useRef } from 'react'; import { TYPE, SPACING, COLORS, getFo |
| components/athletes-first/diagrams/AmplifyAIProcessDiagramMobile.tsx | client-only component | import { StepByStepDiagram, type Step } from '@/components/diagrams/StepByStepDi |
| components/athletes-first/diagrams/AmplifyAIProcessDiagramResponsive.tsx | dynamic import | import { useIsMobile } from '@/hooks/useMediaQuery'; import dynamic from 'next/d |
| components/athletes-first/diagrams/AmplifyAITimingDiagram.tsx | hooks: useEffect, useRef; browser APIs: window | import { useEffect, useRef } from 'react'; import { TYPE, SPACING, COLORS, getFo |
| components/athletes-first/diagrams/AmplifyAITimingDiagramMobile.tsx | client-only component | import { SwipeableDiagram, type DiagramSlide } from '@/components/diagrams/Swipe |
| components/athletes-first/diagrams/AmplifyAITimingDiagramResponsive.tsx | dynamic import | import { useIsMobile } from '@/hooks/useMediaQuery'; import dynamic from 'next/d |
| components/athletes-first/diagrams/BreakthroughDiagram.tsx | client-only component | import { User } from 'lucide-react'; |
| components/athletes-first/diagrams/CloseRateImprovementDiagram.tsx | hooks: useEffect, useRef; browser APIs: window | import { useEffect, useRef } from 'react'; import { TYPE, SPACING, COLORS, getFo |
| components/athletes-first/diagrams/CompetitiveComparisonMatrix.tsx | hooks: useEffect, useRef; browser APIs: window | import { useEffect, useRef } from 'react'; import { TYPE, SPACING, COLORS, getFo |
| components/athletes-first/diagrams/DealMultiplierDiagram.tsx | hooks: useEffect, useRef; browser APIs: window | import { useEffect, useRef } from 'react'; import { TYPE, SPACING, COLORS, getFo |
| components/athletes-first/diagrams/DigitalTwinFlowDiagram.tsx | hooks: useEffect, useRef; browser APIs: window | import { useEffect, useRef } from 'react'; import { TYPE, SPACING, COLORS, getFo |
| components/athletes-first/diagrams/DigitalTwinFlowDiagramMobile.tsx | client-only component | import { StepByStepDiagram, type Step } from '@/components/diagrams/StepByStepDi |
| components/athletes-first/diagrams/DigitalTwinFlowDiagramResponsive.tsx | dynamic import | import { useIsMobile } from '@/hooks/useMediaQuery'; import dynamic from 'next/d |
| components/athletes-first/diagrams/FourModulesSystemDiagram.tsx | hooks: useEffect, useRef; browser APIs: window | import { useEffect, useRef } from 'react'; import { TYPE, SPACING, COLORS, getFo |
| components/athletes-first/diagrams/FourModulesSystemDiagramMobile.tsx | hooks: useState, useEffect, useRef | import { useState, useRef, useEffect } from 'react'; |
| components/athletes-first/diagrams/FourModulesSystemDiagramResponsive.tsx | dynamic import | import { useIsMobile } from '@/hooks/useMediaQuery'; import dynamic from 'next/d |
| components/athletes-first/diagrams/InfiniteDeploymentDiagram.tsx | hooks: useEffect, useRef; browser APIs: window | import { useEffect, useRef } from 'react'; import { TYPE, SPACING, COLORS, getFo |
| components/athletes-first/diagrams/InteractivePitchInterfaceDiagram.tsx | hooks: useEffect, useRef; browser APIs: window | import { useEffect, useRef } from 'react'; import { TYPE, SPACING, COLORS, getFo |
| components/athletes-first/diagrams/InteractivePitchInterfaceDiagramMobile.tsx | client-only component | import { SwipeableDiagram, type DiagramSlide } from '@/components/diagrams/Swipe |
| components/athletes-first/diagrams/InteractivePitchInterfaceDiagramResponsive.tsx | dynamic import | import { useIsMobile } from '@/hooks/useMediaQuery'; import dynamic from 'next/d |
| components/athletes-first/diagrams/MarketSaturationDiagram.tsx | hooks: useEffect, useRef; browser APIs: window | import { useEffect, useRef } from 'react'; import { TYPE, SPACING, COLORS, getFo |
| components/athletes-first/diagrams/NILComplexityDiagram.tsx | hooks: useEffect, useRef; browser APIs: window | import { useEffect, useRef } from 'react'; import { TYPE, SPACING, COLORS, getFo |
| components/athletes-first/diagrams/NILComplexityDiagramMobile.tsx | browser APIs: window | import { AccordionDiagram, type Section } from '@/components/diagrams/AccordionD |
| components/athletes-first/diagrams/NILComplexityDiagramResponsive.tsx | dynamic import | import { useIsMobile } from '@/hooks/useMediaQuery'; import dynamic from 'next/d |
| components/athletes-first/diagrams/NILPlatformFlowDiagram.tsx | hooks: useEffect, useRef; browser APIs: window | import { useEffect, useRef } from 'react'; import { TYPE, SPACING, COLORS, getFo |
| components/athletes-first/diagrams/NILPlatformFlowDiagramMobile.tsx | browser APIs: document | import { StepByStepDiagram, type Step } from '@/components/diagrams/StepByStepDi |
| components/athletes-first/diagrams/NILPlatformFlowDiagramResponsive.tsx | dynamic import | import { useIsMobile } from '@/hooks/useMediaQuery'; import dynamic from 'next/d |
| components/athletes-first/diagrams/RevenueUnlockDiagram.tsx | hooks: useState, useEffect, useRef; browser APIs: window | import { useEffect, useRef, useState } from 'react'; import { TYPE, SPACING, COL |
| components/athletes-first/diagrams/StatusQuoCeilingDiagram.tsx | hooks: useEffect, useRef; browser APIs: window | import { useEffect, useRef } from 'react'; import { TYPE, SPACING, COLORS, getFo |
| components/athletes-first/diagrams/SuccessMetricsDiagram.tsx | hooks: useEffect, useRef; browser APIs: window | import { useEffect, useRef } from 'react'; import { TYPE, SPACING, COLORS, getFo |
| components/athletes-first/diagrams/SuccessMetricsDiagramMobile.tsx | client-only component | import { ProgressiveDisclosureDiagram, type DiagramElement } from '@/components/ |
| components/athletes-first/diagrams/SuccessMetricsDiagramResponsive.tsx | dynamic import | import { useIsMobile } from '@/hooks/useMediaQuery'; import dynamic from 'next/d |
| components/athletes-first/diagrams/ThreeBottlenecksDiagram.tsx | hooks: useEffect, useRef; browser APIs: window | import { useEffect, useRef } from 'react'; import { TYPE, SPACING, COLORS, getFo |
| components/athletes-first/diagrams/ThreeBottlenecksDiagramMobile.tsx | browser APIs: window | import { AccordionDiagram, type Section } from '@/components/diagrams/AccordionD |
| components/athletes-first/diagrams/ThreeBottlenecksDiagramResponsive.tsx | dynamic import | import { useIsMobile } from '@/hooks/useMediaQuery'; import dynamic from 'next/d |
| components/athletes-first/shared/DemoHeader.tsx | client-only component | import { COLORS } from '@/lib/athletes-first/design-tokens'; |
| components/athletes-first/shared/StepIndicator.tsx | client-only component | import { COLORS } from '@/lib/athletes-first/design-tokens'; |
| components/auth/ClientAuthGuard.tsx | hooks: useState, useEffect, usePathname, useRouter | import { useEffect, useState } from 'react'; import { useRouter, usePathname } f |
| components/beta/BetaSignupButton.tsx | hooks: useState | import { useState } from 'react' import { BetaSignupModal } from './BetaSignupMo |
| components/beta/BetaSignupModal.tsx | hooks: useState; browser APIs: fetch | import { useState } from 'react' import { motion, AnimatePresence } from 'framer |
| components/case-study/ChapterRow.tsx | client-only component | import { type ReactNode } from 'react'; |
| components/case-study/MobileCarousel.tsx | hooks: useState, useEffect, useRef; browser APIs: window | import { Children, useEffect, useRef, useState, type ReactNode } from 'react'; |
| components/charlie/BirthdayRestaurantQuiz.tsx | hooks: useState, useEffect, useMemo; browser APIs: fetch | import React, { useEffect, useMemo, useState } from 'react'; |
| components/clara/Sweet16Quiz.tsx | hooks: useState, useEffect, useCallback; browser APIs: fetch | import React, { useState, useEffect, useCallback } from 'react'; |
| components/conversion/ExitIntentModal.tsx | hooks: useState, useEffect; browser APIs: window, document, sessionStorage | import { useState, useEffect } from 'react'; import Link from 'next/link'; impor |
| components/conversion/FormRecoveryModal.tsx | hooks: useState, useEffect; browser APIs: localStorage | import { useEffect, useState } from 'react'; import { trackEvent, AnalyticsEvent |
| components/conversion/KitQuiz.tsx | hooks: useState | import { useState } from 'react'; import { serviceKits } from '@/lib/content/kit |
| components/conversion/RiskReductionTool.tsx | hooks: useState, useMemo; browser APIs: window | import { useState, useMemo } from 'react'; import { GlassCard } from '@/componen |
| components/conversion/StickyCTABar.tsx | hooks: useState, useEffect; browser APIs: window, document, sessionStorage | import { useState, useEffect } from 'react'; import Link from 'next/link'; impor |
| components/creait/CREWelcomeSlide.tsx | client-only component | import { CRE_COLORS } from '@/lib/creait/design-tokens/colors'; |
| components/creait/CREaiTPitchDeck.tsx | hooks: useState, useEffect; browser APIs: window, document; dynamic import | import { useState, useEffect } from 'react'; import { getAllSections, Section, S |
| components/creait/CheckpointCard.tsx | hooks: useState | import { useState } from 'react'; import { GlassCard } from '@/components/visual |
| components/creait/CodeBlock.tsx | hooks: useState; browser APIs: navigator | import { useState } from 'react'; |
| components/creait/DataChecklist.tsx | client-only component | import { GlassCard } from '@/components/visual'; import { getSectionTheme } from |
| components/creait/DocsNavigation.tsx | hooks: usePathname; browser APIs: window, document | import Link from 'next/link'; import { usePathname } from 'next/navigation'; imp |
| components/creait/MermaidDiagram.tsx | hooks: useState, useEffect, useRef | import { useEffect, useRef, useState } from 'react'; import { logger } from '@/l |
| components/creait/PhaseBreakdown.tsx | hooks: useState | import { useState } from 'react'; import { GlassCard } from '@/components/visual |
| components/creait/TechnicalDetail.tsx | hooks: useState | import { useState, ReactNode } from 'react'; |
| components/creait/TimelineWeek.tsx | hooks: useState | import { useState } from 'react'; import { GlassCard } from '@/components/visual |
| components/creait/ViewToggle.tsx | hooks: useState, useContext | import { useState, createContext, useContext, ReactNode } from 'react'; import { |
| components/creait/demos/EmailDraftsDemo.tsx | hooks: useState; browser APIs: navigator | import { useState } from 'react'; import { CRE_COLORS } from '@/lib/creait/desig |
| components/creait/demos/OpportunityDashboardDemo.tsx | hooks: useState | import { useState } from 'react'; import { CRE_COLORS } from '@/lib/creait/desig |
| components/creait/demos/ScoreBreakdownDemo.tsx | client-only component | import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis,  |
| components/creait/diagrams/AIScoreFlowDiagram.tsx | hooks: useEffect, useRef; browser APIs: window | import { useEffect, useRef } from 'react'; import { CRE_COLORS } from '@/lib/cre |
| components/creait/diagrams/AIScoreFlowDiagramMobile.tsx | browser APIs: window | import { StepByStepDiagram, type Step } from '@/components/diagrams/StepByStepDi |
| components/creait/diagrams/AIScoreFlowDiagramResponsive.tsx | dynamic import | import { useIsMobile } from '@/hooks/useMediaQuery'; import dynamic from 'next/d |
| components/creait/diagrams/BrokerDayDiagram.tsx | hooks: useEffect, useRef; browser APIs: window | import { useEffect, useRef } from 'react'; import { CRE_COLORS } from '@/lib/cre |
| components/creait/diagrams/BrokerDayDiagramMobile.tsx | client-only component | import { SwipeableDiagram, type DiagramSlide } from '@/components/diagrams/Swipe |
| components/creait/diagrams/BrokerDayDiagramResponsive.tsx | dynamic import | import { useIsMobile } from '@/hooks/useMediaQuery'; import dynamic from 'next/d |
| components/creait/diagrams/CompetitiveLandscapeDiagram.tsx | hooks: useEffect, useRef; browser APIs: window | import { useEffect, useRef } from 'react'; import { CRE_COLORS } from '@/lib/cre |
| components/creait/diagrams/CompetitiveLandscapeDiagramMobile.tsx | client-only component | import { ProgressiveDisclosureDiagram, type DiagramElement } from '@/components/ |
| components/creait/diagrams/CompetitiveLandscapeDiagramResponsive.tsx | dynamic import | import { useIsMobile } from '@/hooks/useMediaQuery'; import dynamic from 'next/d |
| components/creait/diagrams/InvestmentMilestonesDiagram.tsx | hooks: useEffect, useRef; browser APIs: window | import { useEffect, useRef } from 'react'; import { CRE_COLORS } from '@/lib/cre |
| components/creait/diagrams/InvestmentMilestonesDiagramMobile.tsx | client-only component | import { StepByStepDiagram } from '@/components/diagrams/StepByStepDiagram'; imp |
| components/creait/diagrams/InvestmentMilestonesDiagramResponsive.tsx | dynamic import | import { useIsMobile } from '@/hooks/useMediaQuery'; import dynamic from 'next/d |
| components/creait/diagrams/RevenueRampDiagram.tsx | hooks: useEffect, useRef; browser APIs: window | import { useEffect, useRef } from 'react'; import { CRE_COLORS } from '@/lib/cre |
| components/creait/diagrams/RevenueRampDiagramMobile.tsx | client-only component |  |
| components/creait/diagrams/RevenueRampDiagramResponsive.tsx | dynamic import | import { useIsMobile } from '@/hooks/useMediaQuery'; import dynamic from 'next/d |
| components/creait/diagrams/RoadmapGanttDiagram.tsx | hooks: useEffect, useRef; browser APIs: window | import { useEffect, useRef } from 'react'; import { CRE_COLORS } from '@/lib/cre |
| components/creait/diagrams/RoadmapGanttDiagramMobile.tsx | client-only component | import { StepByStepDiagram, type Step } from '@/components/diagrams/StepByStepDi |
| components/creait/diagrams/RoadmapGanttDiagramResponsive.tsx | dynamic import | import { useIsMobile } from '@/hooks/useMediaQuery'; import dynamic from 'next/d |
| components/creait/diagrams/TAMFunnelDiagram.tsx | hooks: useEffect, useRef; browser APIs: window | import { useEffect, useRef } from 'react'; import { CRE_COLORS } from '@/lib/cre |
| components/creait/diagrams/TAMFunnelDiagramMobile.tsx | client-only component |  |
| components/creait/diagrams/TAMFunnelDiagramResponsive.tsx | dynamic import | import { useIsMobile } from '@/hooks/useMediaQuery'; import dynamic from 'next/d |
| components/creait/diagrams/TimingWindowDiagram.tsx | hooks: useEffect, useRef; browser APIs: window | import { useEffect, useRef } from 'react'; import { CRE_COLORS } from '@/lib/cre |
| components/creait/diagrams/TimingWindowDiagramMobile.tsx | client-only component | import { SwipeableDiagram } from '@/components/diagrams/SwipeableDiagram'; impor |
| components/creait/diagrams/TimingWindowDiagramResponsive.tsx | browser APIs: window; dynamic import | import { useIsMobile } from '@/hooks/useMediaQuery'; import dynamic from 'next/d |
| components/creait/diagrams/UnitEconomicsFlowDiagram.tsx | hooks: useEffect, useRef; browser APIs: window | import { useEffect, useRef } from 'react'; import { CRE_COLORS } from '@/lib/cre |
| components/creait/diagrams/UnitEconomicsFlowDiagramMobile.tsx | client-only component | import { StepByStepDiagram, type Step } from '@/components/diagrams/StepByStepDi |
| components/creait/diagrams/UnitEconomicsFlowDiagramResponsive.tsx | dynamic import | import { useIsMobile } from '@/hooks/useMediaQuery'; import dynamic from 'next/d |
| components/creait/diagrams/ValidationMapDiagram.tsx | hooks: useState, useEffect, useRef; browser APIs: window | import { useEffect, useRef, useState } from 'react'; import { CRE_COLORS } from  |
| components/creait/diagrams/ValidationMapDiagramMobile.tsx | client-only component | import { ProgressiveDisclosureDiagram, type DiagramElement } from '@/components/ |
| components/creait/diagrams/ValidationMapDiagramResponsive.tsx | dynamic import | import { useIsMobile } from '@/hooks/useMediaQuery'; import dynamic from 'next/d |
| components/creait/navigation/ProgressIndicator.tsx | client-only component | import { useSlideNavigation } from './SlideNavigation'; import { CRE_COLORS } fr |
| components/creait/navigation/SlideNavigation.tsx | hooks: useState, useEffect, useContext, usePathname; browser APIs: window | import { createContext, useContext, useEffect, useState } from 'react'; import { |
| components/creait/navigation/SlideTransition.tsx | hooks: usePathname | import { motion, AnimatePresence } from 'framer-motion'; import { usePathname }  |
| components/creait/ui/CREExpandablePanel.tsx | hooks: useState | import { ReactNode } from 'react'; import { CRE_COLORS } from '@/lib/creait/desi |
| components/decks/DeckViewer.tsx | hooks: useState, useEffect, useCallback; browser APIs: window | import { useState, useEffect, useCallback } from 'react'; import Image from 'nex |
| components/diagrams/AccordionDiagram.tsx | client-only component | import * as Accordion from '@radix-ui/react-accordion'; import { ChevronDown } f |
| components/diagrams/ProgressiveDisclosureDiagram.tsx | hooks: useState | import { useState } from 'react'; import { cn } from '@/lib/utils/cn'; |
| components/diagrams/ResponsiveDiagram.tsx | client-only component | import { useIsMobile } from '@/hooks/useMediaQuery'; |
| components/diagrams/StepByStepDiagram.tsx | hooks: useState | import { useState } from 'react'; import { cn } from '@/lib/utils/cn'; |
| components/diagrams/SwipeableDiagram.tsx | client-only component | import { Swiper, SwiperSlide } from 'swiper/react'; import { Pagination, Navigat |
| components/diagrams/createResponsiveDiagram.tsx | dynamic import | import { useIsMobile } from '@/hooks/useMediaQuery'; import dynamic, { type Dyna |
| components/error/ErrorBoundary.tsx | browser APIs: window | import React, { Component, ErrorInfo, ReactNode } from 'react'; import * as Sent |
| components/games/DumbQuestionsGame.tsx | hooks: useState, useEffect, useRef, useCallback; browser APIs: fetch | import { useState, useEffect, useRef, useCallback } from 'react'; import { motio |
| components/games/DumbQuestionsJoin.tsx | hooks: useState; browser APIs: localStorage | import { useState } from 'react'; import { motion } from 'framer-motion'; import |
| components/games/DumbQuestionsLobby.tsx | hooks: useState, useRouter; browser APIs: localStorage | import { useState } from 'react'; import { useRouter } from 'next/navigation'; i |
| components/heirloom/HeirloomDemo/EditableText.tsx | hooks: useState, useEffect, useRef | import { useEffect, useRef, useState } from 'react'; import { EditableTextProps  |
| components/heirloom/HeirloomDemo/HeirloomDemoSimple.tsx | hooks: useState | import { useState } from 'react'; |
| components/heirloom/HeirloomDemo/LineageDropdown.tsx | hooks: useState, useEffect, useRef; browser APIs: document | import { useEffect, useRef, useState } from 'react'; import { ChangeHistory, Fie |
| components/heirloom/HeirloomDemo/ProcessingSection.tsx | client-only component |  |
| components/heirloom/HeirloomDemo/RecipeCard.tsx | hooks: useState, useEffect, useRef; browser APIs: window | import { useState, useRef, useEffect } from 'react'; import { EditableText } fro |
| components/heirloom/HeirloomDemo/RecipeSelector.tsx | hooks: useState, useEffect, useRef; browser APIs: sessionStorage | import React, { useState, useRef, useEffect } from 'react'; import { DetectedRec |
| components/heirloom/HeirloomDemo/SampleRecipeSelector.tsx | hooks: useState, useEffect, useRef, useMemo | import { useState, useEffect, useMemo, useRef } from 'react'; import { SAMPLE_RE |
| components/heirloom/HeirloomDemo/Timeline.tsx | client-only component | import { GENERATIONS, COLORS } from './constants'; |
| components/heirloom/HeirloomDemo/UploadSection.tsx | client-only component |  |
| components/heirloom/HeirloomDemo/index.tsx | hooks: useState, useEffect, useRef, useCallback; browser APIs: window, fetch | import { useState, useCallback, useRef, useEffect } from 'react'; import { Uploa |
| components/heirloom/WarmEmberBackground.tsx | hooks: useState, useEffect | import { useEffect, useState } from 'react'; |
| components/heirloom/demos/dinner-party/DinnerPartyDemo.tsx | hooks: useState, useMemo | import React, { useState, useMemo } from 'react'; import { import { ShoppingList |
| components/heirloom/demos/dinner-party/RecipeStatusCards.tsx | client-only component | import React from 'react'; import { motion, AnimatePresence } from 'framer-motio |
| components/heirloom/demos/dinner-party/TimelineVisualization.tsx | client-only component | import React from 'react'; import { motion } from 'framer-motion'; import { |
| components/heirloom/demos/shopping-lab/ShoppingLabDemo.tsx | hooks: useState, useEffect | import { useState, useEffect } from 'react'; import { ShoppingListManager } from |
| components/heirloom/demos/shopping-lab/components/ExampleRecipeBrowser.tsx | hooks: useState; browser APIs: fetch | import { useState } from 'react'; import { RecipeScraper } from '@/components/he |
| components/heirloom/demos/shopping-lab/components/PantryManager.tsx | hooks: useState | import { useState } from 'react'; import type { ShoppingListManager } from '@/co |
| components/heirloom/demos/shopping-lab/components/ParserShowcase.tsx | hooks: useState | import { useState } from 'react'; import { IngredientParser } from '@/components |
| components/heirloom/demos/shopping-lab/components/RecipeManager.tsx | hooks: useState; browser APIs: fetch | import { useState } from 'react'; import { RecipeScraper } from '@/components/he |
| components/heirloom/demos/shopping-lab/components/ShoppingListView.tsx | hooks: useState | import { useState } from 'react'; import type { ShoppingList } from '@/component |
| components/heirloom/diagrams/IOSFlowDiagram.tsx | hooks: useState | import { useState } from 'react'; import { FileText, Sparkles, Check, Send, Smar |
| components/heirloom/diagrams/ProblemRadialDiagram.tsx | hooks: useState | import { useState } from 'react'; import { Search, FileText, FolderOpen, Clipboa |
| components/heirloom/diagrams/TechnicalArchitectureDiagram.tsx | hooks: useState | import { useState } from 'react'; import { Smartphone, Cloud, Database, ArrowDow |
| components/heirloom/diagrams/TimelineVisualization.tsx | hooks: useState | import { useState } from 'react'; import { Check, Zap, Circle, Rocket } from 'lu |
| components/heirloom/diagrams/UserJourneyDiagram.tsx | hooks: useState | import { useState } from 'react'; import { Compass, Wand2, Palette, Send, Shoppi |
| components/heirloom/pitch/CTACard.tsx | hooks: useRef | import { motion, useInView } from 'framer-motion'; import { useRef } from 'react |
| components/heirloom/pitch/ComparisonTable.tsx | hooks: useRef | import { motion, useInView } from 'framer-motion'; import { useRef } from 'react |
| components/heirloom/pitch/FeatureCard.tsx | hooks: useRef | import { motion, useInView } from 'framer-motion'; import { useRef, ReactNode }  |
| components/heirloom/pitch/FormatCard.tsx | hooks: useRef | import { motion, useInView } from 'framer-motion'; import { useRef, ReactNode }  |
| components/heirloom/pitch/PricingCard.tsx | hooks: useRef | import { motion, useInView } from 'framer-motion'; import { useRef } from 'react |
| components/heirloom/pitch/StatCard.tsx | hooks: useState, useEffect, useRef | import { motion, useInView } from 'framer-motion'; import { useRef, useEffect, u |
| components/heirloom/pitch/StepCard.tsx | hooks: useRef | import { motion, useInView } from 'framer-motion'; import { useRef } from 'react |
| components/heirloom/pitch/TeamCard.tsx | hooks: useRef | import { motion, useInView } from 'framer-motion'; import { useRef } from 'react |
| components/heirloom/social/AttributionBadge.tsx | client-only component | import React from 'react'; import type { SourceType } from '@/lib/firestore/reci |
| components/heirloom/social/SaveRecipeButton.tsx | hooks: useState; browser APIs: fetch | import React, { useState } from 'react'; import type { CreateRecipeInput } from  |
| components/heirloom/social/ShareModal.tsx | hooks: useState, useEffect; browser APIs: window, document, navigator | import React, { useState, useEffect } from 'react'; |
| components/home/ProofBar.tsx | hooks: useState, useEffect, useMemo; browser APIs: window | import { useEffect, useMemo, useState } from 'react'; import { ASCIIUnifiedGrid  |
| components/home/VelocityProof.tsx | client-only component |  |
| components/investors/MaterialCard.tsx | browser APIs: document | import Link from 'next/link'; import { GlassCard } from '@/components/visual/Gla |
| components/layout/DashboardHeader.tsx | client-only component | import Link from 'next/link'; |
| components/layout/ErrorBoundary.tsx | client-only component | import React, { Component, ReactNode } from 'react'; import { logger } from '@/l |
| components/layout/Header.tsx | hooks: useState, useEffect, usePathname; browser APIs: window, document | import Link from 'next/link'; import { usePathname } from 'next/navigation'; imp |
| components/layout/LayoutContent.tsx | hooks: usePathname | import { usePathname } from 'next/navigation'; import { Header, Footer } from "@ |
| components/layout/PanelNavigator.tsx | hooks: useState, useEffect; browser APIs: window | import { ReactNode, useState, useEffect } from 'react'; import { motion, Animate |
| components/layout/Section.tsx | hooks: useState, useEffect, useRef | import { ReactNode, useEffect, useRef, useState } from 'react'; import { type Wa |
| components/pitches/CreaitRoadmap.tsx | hooks: useEffect, useRouter | import { useEffect } from 'react'; import { useRouter } from 'next/navigation';  |
| components/pitches/GannettPitch.tsx | client-only component | import Link from 'next/link'; import { ButtonPrimary } from '@/components/ui/But |
| components/presentation/ArchitectureDiagram.tsx | hooks: useState | import { useState, ReactNode } from 'react'; |
| components/presentation/BulletList.tsx | client-only component | import { RATIONALE_ACCENT } from '@/lib/presentation/design-tokens'; |
| components/presentation/CollapsibleSection.tsx | hooks: useState | import { useState } from 'react'; import { ChevronDown, ChevronRight } from 'luc |
| components/presentation/EvidenceBlock.tsx | client-only component | import { SEMANTIC_COLORS } from '@/lib/presentation/design-tokens'; |
| components/presentation/InteractiveCard.tsx | hooks: useState; browser APIs: window | import { useState, ReactNode } from 'react'; import { ASCIIUnifiedGrid } from '@ |
| components/presentation/ModuleFlowProgress.tsx | client-only component | import { RATIONALE_ACCENT } from '@/lib/presentation/design-tokens'; |
| components/presentation/PhaseBadge.tsx | client-only component | import { PHASE_COLORS, RATIONALE_ACCENT } from '@/lib/presentation/design-tokens |
| components/presentation/PresentationViewer.tsx | hooks: useState, useEffect, useCallback; browser APIs: window, document | import { useState, useEffect, useCallback, ReactNode } from 'react'; import { AS |
| components/presentation/SectionHeader.tsx | client-only component | import { TYPE_SCALE, RATIONALE_ACCENT } from '@/lib/presentation/design-tokens'; |
| components/presentation/ShaderTransition.tsx | hooks: useState, useEffect | import { useState, useEffect, ReactNode } from 'react'; import { ASCIIUnifiedGri |
| components/presentation/TimelineRoadmap.tsx | hooks: useState | import { useState, ReactNode } from 'react'; |
| components/rationale-overview/RationalePitchDeck.tsx | hooks: useState, useEffect; browser APIs: window, document; dynamic import | import { useState, useEffect } from 'react'; import { getAllSectionsV2, Section, |
| components/rationale-overview/diagrams/CheckpointTimelineDiagram.tsx | hooks: useState | import { useState } from 'react'; |
| components/rationale-overview/diagrams/CostComparisonChart.tsx | hooks: useState | import { useState } from 'react'; |
| components/rationale-overview/diagrams/DecisionPressureDiagram.tsx | hooks: useState | import { useState } from 'react'; |
| components/rationale-overview/diagrams/DualEngineModel.tsx | hooks: useState | import { useState } from 'react'; |
| components/rationale-overview/diagrams/EngagementModelsGrid.tsx | hooks: useState; browser APIs: document | import { useState } from 'react'; |
| components/rationale-overview/diagrams/HeroAnimation.tsx | hooks: useState, useEffect | import { useState, useEffect } from 'react'; |
| components/rationale-overview/diagrams/MethodologyOriginShowcase.tsx | client-only component | import Image from 'next/image'; |
| components/rationale-overview/diagrams/ProductRangeDiagram.tsx | client-only component |  |
| components/rationale-overview/diagrams/ProofDiversityInfographic.tsx | client-only component |  |
| components/rationale-overview/diagrams/ReadyToBuildInfographic.tsx | client-only component | import { FileText, Briefcase, MessageSquare, ArrowRight } from 'lucide-react'; |
| components/rationale-overview/diagrams/ServiceOfferingBreakdown.tsx | hooks: useState; browser APIs: document | import { useState } from 'react'; |
| components/rationale-overview/diagrams/SevenPrototypeFramework.tsx | hooks: useState | import { useState } from 'react'; |
| components/rationale-overview/diagrams/SpecVsPrototypeDiagram.tsx | hooks: useState; browser APIs: document | import { useState } from 'react'; |
| components/rationale-overview/diagrams/TraditionalVsRationaleDiagram.tsx | hooks: useState | import { useState } from 'react'; |
| components/rationale-overview/diagrams/TraditionalVsRationaleDiagramMobile.tsx | hooks: useState | import { useState } from 'react'; import { ChevronDown, ChevronUp } from 'lucide |
| components/rationale-overview/diagrams/TraditionalVsRationaleDiagramResponsive.tsx | hooks: useState, useEffect; browser APIs: window; dynamic import | import { useState, useEffect } from 'react'; import dynamic from 'next/dynamic'; |
| components/rationale-overview/diagrams/WhoThisIsForInfographic.tsx | client-only component | import { Zap, Users, Handshake, TrendingUp } from 'lucide-react'; |
| components/rationale-overview/diagrams/ZeroArchitectureDiagram.tsx | hooks: useState | import { useState } from 'react'; |
| components/rationale-overview/diagrams/ZeroArchitectureDiagramMobile.tsx | hooks: useState | import { useState } from 'react'; import { ChevronDown, ChevronUp } from 'lucide |
| components/rationale-overview/diagrams/ZeroArchitectureDiagramResponsive.tsx | hooks: useState, useEffect; browser APIs: window; dynamic import | import { useState, useEffect } from 'react'; import dynamic from 'next/dynamic'; |
| components/rationale-overview/diagrams/ZeroMetricsDiagram.tsx | hooks: useState | import { useState } from 'react'; |
| components/rationale-overview/diagrams/ZeroMetricsDiagramMobile.tsx | client-only component |  |
| components/rationale-overview/diagrams/ZeroMetricsDiagramResponsive.tsx | hooks: useState, useEffect; browser APIs: window; dynamic import | import { useState, useEffect } from 'react'; import dynamic from 'next/dynamic'; |
| components/sanitary-waste-system/SanitaryWasteDeck.tsx | hooks: useState, useEffect, useRef; browser APIs: window, document, navigator; dynamic import | import { useState, useEffect, useRef } from 'react'; import { sanitaryWasteSecti |
| components/sanitary-waste-system/SanitaryWasteSystemOverview.tsx | browser APIs: window | import Link from 'next/link'; import { ArrowRight, ExternalLink, Package, Trendi |
| components/sanitary-waste-system/diagrams/CompetitivePositioningDiagram.tsx | client-only component |  |
| components/sanitary-waste-system/diagrams/DisgustBarrierDiagram.tsx | client-only component |  |
| components/sanitary-waste-system/diagrams/DispenserFlowDemo.tsx | hooks: useState, useEffect, useRef; browser APIs: window | import { useState, useEffect, useRef } from 'react'; |
| components/sanitary-waste-system/diagrams/ManufacturingFlowDiagram.tsx | client-only component |  |
| components/sanitary-waste-system/diagrams/ProductSystemDiagram.tsx | client-only component |  |
| components/sanitary-waste-system/diagrams/RazorBladeEconomicsDiagram.tsx | hooks: useState, useEffect, useRef; browser APIs: window | import { useEffect, useRef, useState } from 'react'; |
| components/sanitary-waste-system/diagrams/RetailBetaTimelineDiagram.tsx | hooks: useState, useEffect, useRef; browser APIs: window | import { useEffect, useRef, useState } from 'react'; |
| components/sanitary-waste-system/diagrams/RoadmapTimelineDiagram.tsx | hooks: useState | import { useState } from 'react'; |
| components/sanitary-waste-system/diagrams/RollVsInterfoldedDiagram.tsx | client-only component |  |
| components/sanitary-waste-system/diagrams/SeedMetricsDashboard.tsx | hooks: useState | import { useState } from 'react'; |
| components/sanitary-waste-system/diagrams/StagedFundingDiagram.tsx | hooks: useState | import { useState } from 'react'; |
| components/sanitary-waste-system/diagrams/SupplyChainEconomicsDiagram.tsx | client-only component |  |
| components/sanitary-waste-system/diagrams/UnitEconomicsDetailDiagram.tsx | hooks: useState | import { useState } from 'react'; |
| components/sections/PasswordGate.tsx | hooks: useState, useEffect; browser APIs: window, sessionStorage | import { useState, useEffect, ReactNode } from 'react'; import { ResponsiveText  |
| components/sections/ServicesAccordion.tsx | hooks: useState | import { useState } from 'react'; import type { WatercolorTheme } from '@/lib/th |
| components/seo/StructuredData.tsx | client-only component | import Script from 'next/script'; |
| components/ui/AnimatedCounter.tsx | hooks: useState, useEffect, useRef | import { useEffect, useRef, useState } from 'react'; |
| components/ui/ButtonHierarchy.tsx | client-only component | import Link from 'next/link'; import { ButtonHTMLAttributes, AnchorHTMLAttribute |
| components/ui/MobileCarousel.tsx | hooks: useState, useEffect, useRef | import { useState, useRef, useEffect } from 'react'; |
| components/unlock/UnlockForm.tsx | hooks: useState; browser APIs: window, fetch | import { useState, type FormEvent } from 'react'; import { Lock, Loader2 } from  |
| components/video-player/LazyVideo.tsx | hooks: useState, useEffect, useRef | import { useEffect, useRef, useState } from 'react'; import { videoUrl } from '@ |
| components/video-player/VideoPlayer.tsx | hooks: useState, useEffect, useRef; browser APIs: window | import { useEffect, useRef, useState } from 'react'; import { videoUrl } from '@ |
| components/visual-test/CollapsibleOS8Window.tsx | hooks: useState | import { useState } from 'react'; import { OS8Window } from './OS8Window'; impor |
| components/visual-test/GridShader.tsx | client-only component | import { cn } from '@/lib/utils/cn'; |
| components/visual-test/OS8Window.tsx | browser APIs: window | import { ReactNode } from 'react'; import { cn } from '@/lib/utils/cn'; |
| components/visual-test/ScanlineEffect.tsx | client-only component | import { cn } from '@/lib/utils/cn'; |
| components/visual-test/TerminalPrompt.tsx | hooks: useState, useEffect | import { useEffect, useState } from 'react'; import { cn } from '@/lib/utils/cn' |
| components/visual-test/YellowGlow.tsx | client-only component | import { ReactNode } from 'react'; import { cn } from '@/lib/utils/cn'; |
| components/visual/ASCIIShaderGrid.tsx | hooks: useState, useEffect, useRef, useMemo; browser APIs: document | import { useRef, useMemo, useEffect, useState } from 'react'; import { Canvas, u |
| components/visual/ASCIIUnifiedGrid.tsx | hooks: useState, useEffect, useRef; browser APIs: window, navigator | import { useEffect, useRef, useState } from 'react'; import { interpolateColors, |
| components/visual/ASCIIWaveDivider.tsx | hooks: useState, useEffect, useRef, useMemo; browser APIs: window, document | import { useEffect, useState, useRef, useMemo } from 'react'; import { interpola |
| components/visual/DotGrid.tsx | hooks: useState, useEffect | import { useEffect, useState } from 'react'; |
| components/visual/GlassCard.tsx | client-only component | import { ReactNode } from 'react'; import type { WatercolorTheme } from '@/lib/t |
| components/visual/GlitchText.tsx | hooks: useState | import { ReactNode, useState } from 'react'; |
| components/visual/GradientMesh.tsx | hooks: useState, useEffect | import { useEffect, useState } from 'react'; |
| components/visual/InvestorASCIIGrid.tsx | client-only component | import { ASCIIUnifiedGrid } from './ASCIIUnifiedGrid'; import { watercolorThemes |
| components/visual/TypewriterText.tsx | hooks: useState, useEffect | import { useState, useEffect } from 'react'; |
| components/visual/ZeroASCIIGrid.tsx | client-only component | import { ASCIIUnifiedGrid } from './ASCIIUnifiedGrid'; import { watercolorThemes |
| components/visual/ascii/ASCIIImage.tsx | hooks: useState, useEffect, useRef; browser APIs: document | import { useEffect, useRef, useState } from 'react'; |
| components/visual/ascii/ASCIIImageOptimized.tsx | hooks: useState, useEffect, useRef; browser APIs: document | import { useEffect, useRef, useState } from 'react'; |
| components/zero-sequence/EmailInput/index.tsx | hooks: useState, useEffect; browser APIs: fetch | import { useState, useEffect } from 'react'; import type { EmailData, EmailTempl |
| components/zero-sequence/ModalStepContent.tsx | client-only component | import { motion } from 'framer-motion'; |
| components/zero-sequence/StatusBanner.tsx | hooks: useState, useEffect | import { useEffect, useState } from 'react'; |
| components/zero-sequence/StepCard.tsx | client-only component | import { ReactNode } from 'react'; |
| components/zero-sequence/Steps/ActionRouting.tsx | client-only component | import type { ActionData } from '@/lib/zero-sequence/types'; |
| components/zero-sequence/Steps/EntityExtraction.tsx | client-only component | import type { EntityData, Entity } from '@/lib/zero-sequence/types'; |
| components/zero-sequence/Steps/IntentClassification.tsx | client-only component | import type { ClassificationResult } from '@/lib/zero-sequence/types'; import {  |
| components/zero-sequence/Steps/ModalFlowAnalysis.tsx | client-only component | import type { ModalFlowData } from '@/lib/zero-sequence/types'; import ModalStep |
| components/zero-sequence/ZeroSequenceDemo.tsx | client-only component | import { useZeroSequenceStore } from '@/lib/zero-sequence/store'; import EmailIn |
| components/zero/ActionFlowModal.tsx | hooks: useState, useEffect, useMemo | import { motion, AnimatePresence } from 'framer-motion'; import { useState, useE |
| components/zero/ActionSheet.tsx | hooks: useState, useEffect, useMemo; browser APIs: window, navigator | import { useState, useEffect, useMemo } from 'react'; import { motion, AnimatePr |
| components/zero/BeforeAfterComparison.tsx | hooks: useState | import { motion } from 'framer-motion'; import { useState } from 'react'; |
| components/zero/BetaSignupButton.tsx | hooks: useState; browser APIs: fetch | import { useState } from 'react'; import { OnboardingFlow } from './OnboardingFl |
| components/zero/Confetti.tsx | hooks: useState, useEffect; browser APIs: window | import { motion } from 'framer-motion'; import { useEffect, useState } from 'rea |
| components/zero/EmailCard.tsx | hooks: useState; browser APIs: document | import { useState } from 'react'; import { createPortal } from 'react-dom'; impo |
| components/zero/EmbeddedCTA.tsx | browser APIs: window | import { motion } from 'framer-motion'; |
| components/zero/ExitIntentModal.tsx | hooks: useState, useEffect; browser APIs: window, document | import { useState, useEffect } from 'react'; import { motion, AnimatePresence }  |
| components/zero/FloatingOrbs.tsx | hooks: useState, useEffect | import { useEffect, useState } from 'react'; |
| components/zero/GalaxyBackground.tsx | hooks: useState, useEffect | import { useEffect, useState } from 'react'; |
| components/zero/GuidedTutorial.tsx | hooks: useState, useEffect; browser APIs: localStorage | import { useState, useEffect } from 'react'; import { motion, AnimatePresence }  |
| components/zero/InteractiveDemo.tsx | hooks: useState, useEffect | import { useEffect, useState } from 'react'; import { useResponsiveLayout } from |
| components/zero/InvestorLayout.tsx | hooks: useState, useEffect, usePathname, useRouter; browser APIs: sessionStorage | import { useEffect, useState } from 'react'; import { useRouter, usePathname } f |
| components/zero/OnboardingFlow.tsx | hooks: useState; browser APIs: document | import { useState } from 'react'; import { CheckCircle2, Download, Mail, Smartph |
| components/zero/OnboardingProgressTracker.tsx | hooks: useState, useEffect; browser APIs: localStorage | import { useState, useEffect } from 'react'; import { CheckCircle2, Circle, Down |
| components/zero/SocialProof.tsx | hooks: useState, useEffect | import { motion } from 'framer-motion'; import { useState, useEffect } from 'rea |
| components/zero/ToastUndo.tsx | hooks: useEffect | import { motion } from 'framer-motion'; import { useEffect } from 'react'; |
| components/zero/diagrams/AIIntelligenceSystemDiagram.tsx | hooks: useState | import { useState } from 'react'; import { Mail, Brain, Zap, CheckCircle, Clock, |
| components/zero/diagrams/AIIntelligenceSystemDiagramMobile.tsx | hooks: useState | import { useState } from 'react'; import { Mail, Brain, Zap, CheckCircle, Clock, |
| components/zero/diagrams/AIIntelligenceSystemDiagramResponsive.tsx | hooks: useState, useEffect; browser APIs: window; dynamic import | import { useState, useEffect } from 'react'; import dynamic from 'next/dynamic'; |
| components/zero/diagrams/BetaRoadmapTimelineDiagram.tsx | hooks: useState | import { useState } from 'react'; import { Users, TrendingUp, Rocket, CheckCircl |
| components/zero/diagrams/BetaRoadmapTimelineDiagramMobile.tsx | hooks: useState | import { useState } from 'react'; import { Users, TrendingUp, Rocket, CheckCircl |
| components/zero/diagrams/BetaRoadmapTimelineDiagramResponsive.tsx | hooks: useState, useEffect; browser APIs: window; dynamic import | import { useState, useEffect } from 'react'; import dynamic from 'next/dynamic'; |
| components/zero/diagrams/InboxJourneyDiagram.tsx | hooks: useState | import { useState } from 'react'; import { TrendingDown, Search, Zap, Star, Targ |
| components/zero/diagrams/InboxJourneyDiagramMobile.tsx | hooks: useState | import { useState } from 'react'; import { TrendingDown, Search, Zap, Star, Targ |
| components/zero/diagrams/InboxJourneyDiagramResponsive.tsx | hooks: useState, useEffect; browser APIs: window; dynamic import | import { useState, useEffect } from 'react'; import dynamic from 'next/dynamic'; |
| components/zero/diagrams/MicroservicesArchitectureDiagram.tsx | hooks: useState | import { useState } from 'react'; import { Server, Database, Zap, Mail, Brain, S |
| components/zero/diagrams/MicroservicesArchitectureDiagramMobile.tsx | hooks: useState | import { useState } from 'react'; import { Server, Database, Zap, Mail, Brain, S |
| components/zero/diagrams/MicroservicesArchitectureDiagramResponsive.tsx | hooks: useState, useEffect; browser APIs: window; dynamic import | import { useState, useEffect } from 'react'; import dynamic from 'next/dynamic'; |
| components/zero/diagrams/SwipeTriageTreeDiagram.tsx | hooks: useState | import { useState } from 'react'; import { ArrowLeft, ArrowRight, ArrowUp, Arrow |
| components/zero/diagrams/SwipeTriageTreeDiagramMobile.tsx | hooks: useState | import { useState } from 'react'; import { ArrowLeft, ArrowRight, ArrowUp, Arrow |
| components/zero/diagrams/SwipeTriageTreeDiagramResponsive.tsx | hooks: useState, useEffect; browser APIs: window; dynamic import | import { useState, useEffect } from 'react'; import dynamic from 'next/dynamic'; |
| components/zero/layouts/DesktopAnnotatedDemo.tsx | hooks: useState, useEffect, useRef | import { useState, useEffect, useRef } from 'react'; import { motion, useAnimati |
| components/zero/layouts/MobileNativeDemo.tsx | hooks: useState, useEffect, useRef | import { useState, useEffect, useRef } from 'react'; import { motion, useAnimati |
| components/zero/layouts/TabletFullWidthDemo.tsx | hooks: useState, useEffect, useRef | import { useState, useEffect, useRef } from 'react'; import { motion, useAnimati |

## hooks (8)

| File | Reason | Top imports |
|------|--------|-------------|
| hooks/useABTest.ts | hooks: useState, useEffect; browser APIs: window, localStorage | import { useState, useEffect } from 'react'; |
| hooks/useDemoAnalytics.ts | hooks: useEffect, useRef, useCallback; browser APIs: window, navigator | import { useEffect, useCallback, useRef } from 'react'; |
| hooks/useFormRecovery.ts | hooks: useEffect, useRef, useCallback; browser APIs: window, localStorage | import { useEffect, useCallback, useRef } from 'react'; import { trackEvent, Ana |
| hooks/useInputMethod.ts | hooks: useState, useEffect; browser APIs: window, navigator | import { useState, useEffect } from 'react'; import { useMediaQuery } from './us |
| hooks/useKeyboardNavigation.ts | hooks: useEffect, useCallback; browser APIs: window | import { useEffect, useCallback } from 'react'; |
| hooks/useMediaQuery.ts | hooks: useState, useEffect; browser APIs: window | import { useState, useEffect } from 'react'; |
| hooks/useResponsiveLayout.ts | client-only component | import { useIsMobile, useIsTablet, useIsDesktop } from './useMediaQuery'; |
| hooks/useSwipeVelocity.ts | hooks: useRef | import { useRef } from 'react'; |

## lib (1)

| File | Reason | Top imports |
|------|--------|-------------|
| lib/auth/AuthContext.tsx | hooks: useState, useEffect, useCallback, useContext; browser APIs: window | import { createContext, useContext, useEffect, useState, ReactNode, useCallback  |

