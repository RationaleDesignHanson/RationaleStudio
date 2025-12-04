"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  ThumbsUp,
  ThumbsDown,
  Share2,
  BarChart3,
  Sparkles,
  RefreshCw,
  Play,
  Award,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type Scenario = "celebration" | "controversy" | "endorsement" | "crisis";
type Platform = "twitter" | "instagram" | "tiktok";
type MobileTab = "scenarios" | "compose" | "results" | "examples";

interface AISTSimulatorProps {
  showHeader?: boolean;
}

export default function AISTSimulator({ showHeader = true }: AISTSimulatorProps = {}) {
  const [selectedScenario, setSelectedScenario] = useState<Scenario>("celebration");
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>("twitter");
  const [draftPost, setDraftPost] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [tone, setTone] = useState<"humble" | "confident" | "motivational">("confident");
  const [mobileTab, setMobileTab] = useState<MobileTab>("scenarios");
  const [scenarioIndex, setScenarioIndex] = useState(0);

  const scenarios = [
    {
      id: "celebration" as Scenario,
      title: "Game-Winning Performance",
      description: "You just scored the winning touchdown",
      icon: Award,
      color: "from-green-500 to-emerald-600",
    },
    {
      id: "controversy" as Scenario,
      title: "Controversial Call",
      description: "Refs made a questionable call against your team",
      icon: AlertTriangle,
      color: "from-orange-500 to-red-600",
    },
    {
      id: "endorsement" as Scenario,
      title: "New Brand Partnership",
      description: "Announcing a major endorsement deal",
      icon: Sparkles,
      color: "from-blue-500 to-cyan-600",
    },
    {
      id: "crisis" as Scenario,
      title: "Injury Announcement",
      description: "Addressing a setback with fans",
      icon: MessageSquare,
      color: "from-purple-500 to-pink-600",
    },
  ];

  const scenarioContent = {
    celebration: {
      prompt: "Share your excitement about tonight's win",
      goodExample:
        "Grateful for my team and the fans tonight. We work hard for moments like these. #TeamFirst",
      badExample: "TOLD YALL I'M THE BEST. Anyone who doubted me can sit down!",
    },
    controversy: {
      prompt: "Respond to a controversial referee decision",
      goodExample:
        "Tough calls are part of the game. We'll regroup and come back stronger next week.",
      badExample:
        "REFS NEED TO GET THEIR EYES CHECKED!!! This league is a joke sometimes",
    },
    endorsement: {
      prompt: "Announce your new partnership with Nike",
      goodExample:
        "Excited to officially join the @Nike family. Been dreaming of this since I was a kid. Let's work.",
      badExample:
        "Just signed a HUGE deal with Nike! Check out my new gear link in bio",
    },
    crisis: {
      prompt: "Address a minor injury that will sideline you",
      goodExample:
        "Minor setback, but I'll be back stronger. Thanks for all the support - it means everything to me and my family.",
      badExample: "Injured again... This is so frustrating. Why does this always happen to me?",
    },
  };

  const runSimulation = () => {
    setShowResults(true);
    setMobileTab("results");
  };

  const resetSimulation = () => {
    setShowResults(false);
    setDraftPost("");
  };

  // Mock sentiment analysis results
  const results = {
    sentimentScore: draftPost.toLowerCase().includes("grateful") ||
      draftPost.toLowerCase().includes("thanks") ? 85 : 45,
    brandSafe: !draftPost.includes("!") || draftPost.split("!").length <= 2,
    engagement: Math.floor(Math.random() * 40) + 60,
    controversy: draftPost.toLowerCase().includes("joke") ? 75 : 15,
  };

  const nextScenario = () => {
    const newIndex = (scenarioIndex + 1) % scenarios.length;
    setScenarioIndex(newIndex);
    setSelectedScenario(scenarios[newIndex].id);
    setShowResults(false);
    setDraftPost("");
  };

  const prevScenario = () => {
    const newIndex = (scenarioIndex - 1 + scenarios.length) % scenarios.length;
    setScenarioIndex(newIndex);
    setSelectedScenario(scenarios[newIndex].id);
    setShowResults(false);
    setDraftPost("");
  };

  return (
    <section className="text-white py-4 md:py-6">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          {showHeader && (
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/10 border border-white/20 rounded-lg p-3 mb-3">
              <div className="text-sm md:text-base font-semibold text-white mb-0.5 leading-tight">
                AI Social Media Training Simulator
              </div>
              <div className="text-xs md:text-sm text-white/60 leading-snug">
                Practice high-pressure moments before they happen
              </div>
            </div>
          )}

          {/* Mobile Tab Navigation */}
          <div className="lg:hidden mb-6">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {[
                { id: "scenarios" as MobileTab, label: "Scenarios" },
                { id: "compose" as MobileTab, label: "Compose" },
                { id: "results" as MobileTab, label: "Results" },
                { id: "examples" as MobileTab, label: "Examples" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setMobileTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg font-semibold text-xs whitespace-nowrap transition-colors ${
                    mobileTab === tab.id
                      ? "bg-cyan-500 text-white"
                      : "bg-gray-800 text-gray-400"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile: Scenarios Tab */}
          {mobileTab === "scenarios" && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:hidden mb-8"
            >
              <h3 className="text-xl font-bold mb-4">Choose a Scenario</h3>

              {/* Horizontal Carousel for Mobile */}
              <div className="relative">
                <div className="overflow-hidden">
                  <div
                    className="flex transition-transform duration-300"
                    style={{ transform: `translateX(-${scenarioIndex * 100}%)` }}
                  >
                    {scenarios.map((scenario) => {
                      const Icon = scenario.icon;
                      return (
                        <div
                          key={scenario.id}
                          className="w-full flex-shrink-0 px-2"
                        >
                          <div
                            className={`p-6 rounded-2xl border-2 bg-gradient-to-br ${scenario.color} border-white shadow-xl`}
                          >
                            <Icon className="w-10 h-10 mb-3 mx-auto" />
                            <h4 className="font-bold text-lg mb-2 text-center">{scenario.title}</h4>
                            <p className="text-sm text-center">{scenario.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Carousel Controls */}
                <button
                  onClick={prevScenario}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 bg-black/50 p-2 rounded-full"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextScenario}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 bg-black/50 p-2 rounded-full"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Indicators */}
                <div className="flex justify-center gap-2 mt-4">
                  {scenarios.map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        idx === scenarioIndex ? "bg-cyan-400" : "bg-gray-600"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={() => setMobileTab("compose")}
                className="w-full mt-6 bg-cyan-500 text-white font-bold py-3 rounded-xl"
              >
                Continue to Compose →
              </button>
            </motion.div>
          )}

          {/* Desktop: Scenario Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="hidden lg:block mb-12"
          >
            <h3 className="text-2xl font-bold mb-6">Choose a Scenario</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {scenarios.map((scenario) => {
                const Icon = scenario.icon;
                return (
                  <button
                    key={scenario.id}
                    onClick={() => {
                      setSelectedScenario(scenario.id);
                      setShowResults(false);
                      setDraftPost("");
                    }}
                    className={`p-6 rounded-2xl border-2 transition-all ${
                      selectedScenario === scenario.id
                        ? `bg-gradient-to-br ${scenario.color} border-white shadow-xl`
                        : "bg-gray-800 border-gray-700 hover:border-gray-600"
                    }`}
                  >
                    <Icon className="w-8 h-8 mb-3 mx-auto" />
                    <h4 className="font-bold mb-2">{scenario.title}</h4>
                    <p className="text-sm text-gray-300">{scenario.description}</p>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Mobile: Compose Tab */}
          {mobileTab === "compose" && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:hidden"
            >
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-6 border border-white/10">
                <h3 className="text-xl font-bold mb-4">Draft Your Post</h3>

                {/* Scenario Prompt */}
                <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-4 mb-4">
                  <p className="text-xs font-semibold text-blue-400 mb-2">
                    SCENARIO
                  </p>
                  <p className="text-white text-sm">
                    {scenarioContent[selectedScenario].prompt}
                  </p>
                </div>

                {/* Platform Selector */}
                <div className="mb-4">
                  <label className="text-sm font-semibold text-gray-400 mb-2 block">
                    Platform
                  </label>
                  <div className="flex gap-2">
                    {(["twitter", "instagram", "tiktok"] as Platform[]).map(
                      (platform) => (
                        <button
                          key={platform}
                          onClick={() => setSelectedPlatform(platform)}
                          className={`flex-1 py-2 rounded-lg font-semibold capitalize transition-colors text-sm ${
                            selectedPlatform === platform
                              ? "bg-blue-600 text-white"
                              : "bg-gray-700 text-gray-400"
                          }`}
                        >
                          {platform}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Tone Selector */}
                <div className="mb-4">
                  <label className="text-sm font-semibold text-gray-400 mb-2 block">
                    Tone
                  </label>
                  <div className="flex gap-2">
                    {(["humble", "confident", "motivational"] as const).map(
                      (t) => (
                        <button
                          key={t}
                          onClick={() => setTone(t)}
                          className={`flex-1 py-2 rounded-lg font-semibold capitalize transition-colors text-sm ${
                            tone === t
                              ? "bg-purple-600 text-white"
                              : "bg-gray-700 text-gray-400"
                          }`}
                        >
                          {t}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Text Area */}
                <textarea
                  value={draftPost}
                  onChange={(e) => setDraftPost(e.target.value)}
                  placeholder="Type your post here..."
                  rows={6}
                  className="w-full bg-black/50 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors resize-none mb-4 text-sm"
                />

                {/* Character Count */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-400">
                    {draftPost.length} / 280 characters
                  </span>
                  {draftPost.length > 280 && (
                    <span className="text-sm text-red-400">Over limit!</span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={runSimulation}
                    disabled={!draftPost.trim()}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Play className="w-4 h-4" />
                    Run Simulation
                  </button>
                  <button
                    onClick={resetSimulation}
                    className="bg-white/10 text-white p-3 rounded-xl"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Desktop: Two-Column Layout */}
          <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Left: Post Composer */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-white/10"
            >
              <h3 className="text-2xl font-bold mb-6">Draft Your Post</h3>

              {/* Scenario Prompt */}
              <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-4 mb-6">
                <p className="text-sm font-semibold text-blue-400 mb-2">
                  SCENARIO
                </p>
                <p className="text-white">
                  {scenarioContent[selectedScenario].prompt}
                </p>
              </div>

              {/* Platform Selector */}
              <div className="mb-6">
                <label className="text-sm font-semibold text-gray-400 mb-3 block">
                  Platform
                </label>
                <div className="flex gap-3">
                  {(["twitter", "instagram", "tiktok"] as Platform[]).map(
                    (platform) => (
                      <button
                        key={platform}
                        onClick={() => setSelectedPlatform(platform)}
                        className={`flex-1 py-2 rounded-lg font-semibold capitalize transition-colors ${
                          selectedPlatform === platform
                            ? "bg-blue-600 text-white"
                            : "bg-gray-700 text-gray-400 hover:bg-gray-600"
                        }`}
                      >
                        {platform}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Tone Selector */}
              <div className="mb-6">
                <label className="text-sm font-semibold text-gray-400 mb-3 block">
                  Tone
                </label>
                <div className="flex gap-3">
                  {(["humble", "confident", "motivational"] as const).map(
                    (t) => (
                      <button
                        key={t}
                        onClick={() => setTone(t)}
                        className={`flex-1 py-2 rounded-lg font-semibold capitalize transition-colors ${
                          tone === t
                            ? "bg-purple-600 text-white"
                            : "bg-gray-700 text-gray-400 hover:bg-gray-600"
                        }`}
                      >
                        {t}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Text Area */}
              <textarea
                value={draftPost}
                onChange={(e) => setDraftPost(e.target.value)}
                placeholder="Type your post here..."
                rows={6}
                className="w-full bg-black/50 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors resize-none mb-6"
              />

              {/* Character Count */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm text-gray-400">
                  {draftPost.length} / 280 characters
                </span>
                {draftPost.length > 280 && (
                  <span className="text-sm text-red-400">Over limit!</span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={runSimulation}
                  disabled={!draftPost.trim()}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold py-3 rounded-xl hover:from-blue-500 hover:to-cyan-500 transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Run Simulation
                </button>
                <button
                  onClick={resetSimulation}
                  className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-xl transition-colors"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>
            </motion.div>

            {/* Right: Results & Feedback */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-white/10"
            >
              <h3 className="text-2xl font-bold mb-6">Analysis & Feedback</h3>

              <AnimatePresence mode="wait">
                {!showResults ? (
                  <motion.div
                    key="waiting"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-full min-h-[400px] text-center"
                  >
                    <BarChart3 className="w-16 h-16 text-gray-600 mb-4" />
                    <p className="text-gray-400">
                      Draft your post and run the simulation to see predicted
                      results
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    {/* Sentiment Score */}
                    <div className="bg-black/30 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-bold">Sentiment Score</h4>
                        <span
                          className={`text-3xl font-bold ${
                            results.sentimentScore >= 70
                              ? "text-green-400"
                              : results.sentimentScore >= 40
                              ? "text-yellow-400"
                              : "text-red-400"
                          }`}
                        >
                          {results.sentimentScore}
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-3">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${results.sentimentScore}%` }}
                          className={`h-3 rounded-full ${
                            results.sentimentScore >= 70
                              ? "bg-gradient-to-r from-green-500 to-emerald-500"
                              : results.sentimentScore >= 40
                              ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                              : "bg-gradient-to-r from-red-500 to-pink-500"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Brand Safety */}
                    <div className="bg-black/30 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold">Brand Safety</h4>
                        {results.brandSafe ? (
                          <CheckCircle2 className="w-6 h-6 text-green-400" />
                        ) : (
                          <AlertTriangle className="w-6 h-6 text-red-400" />
                        )}
                      </div>
                      <p className="text-sm text-gray-400">
                        {results.brandSafe
                          ? "Post is brand-safe and professional"
                          : "Post may contain risky language for sponsors"}
                      </p>
                    </div>

                    {/* Predicted Engagement */}
                    <div className="bg-black/30 rounded-xl p-6">
                      <h4 className="font-bold mb-3">Predicted Engagement</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <ThumbsUp className="w-4 h-4 text-blue-400" />
                            <span className="text-sm">Likes</span>
                          </div>
                          <span className="font-semibold">
                            ~{results.engagement}K
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Share2 className="w-4 h-4 text-green-400" />
                            <span className="text-sm">Shares</span>
                          </div>
                          <span className="font-semibold">
                            ~{Math.floor(results.engagement / 10)}K
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-purple-400" />
                            <span className="text-sm">Reach</span>
                          </div>
                          <span className="font-semibold">
                            ~{results.engagement * 3}K
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Controversy Risk */}
                    <div className="bg-black/30 rounded-xl p-6">
                      <h4 className="font-bold mb-3">Controversy Risk</h4>
                      <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${results.controversy}%` }}
                          className={`h-3 rounded-full ${
                            results.controversy < 30
                              ? "bg-gradient-to-r from-green-500 to-emerald-500"
                              : results.controversy < 60
                              ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                              : "bg-gradient-to-r from-red-500 to-pink-500"
                          }`}
                        />
                      </div>
                      <p className="text-sm text-gray-400">
                        {results.controversy < 30
                          ? "Low risk - safe to post"
                          : results.controversy < 60
                          ? "Moderate risk - consider revising"
                          : "High risk - strongly recommend changes"}
                      </p>
                    </div>

                    {/* AI Suggestions */}
                    <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl p-6">
                      <div className="flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold mb-2">AI Suggestions</h4>
                          <ul className="text-sm text-gray-300 space-y-2">
                            {results.sentimentScore < 70 && (
                              <li>
                                • Consider adding gratitude or team recognition
                              </li>
                            )}
                            {!results.brandSafe && (
                              <li>
                                • Reduce excessive punctuation or ALL CAPS
                              </li>
                            )}
                            {results.controversy > 50 && (
                              <li>
                                • Avoid calling out refs or league decisions
                              </li>
                            )}
                            <li>• Add relevant hashtags for visibility</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Mobile: Results Tab */}
          {mobileTab === "results" && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:hidden"
            >
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-6 border border-white/10">
                <h3 className="text-xl font-bold mb-6">Analysis & Feedback</h3>

                {!showResults ? (
                  <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
                    <BarChart3 className="w-12 h-12 text-gray-600 mb-4" />
                    <p className="text-gray-400 text-sm">
                      Draft your post and run the simulation to see predicted results
                    </p>
                    <button
                      onClick={() => setMobileTab("compose")}
                      className="mt-4 px-6 py-2 bg-cyan-500 text-white rounded-lg"
                    >
                      Go to Compose
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Sentiment Score */}
                    <div className="bg-black/30 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-bold text-sm">Sentiment Score</h4>
                        <span
                          className={`text-2xl font-bold ${
                            results.sentimentScore >= 70
                              ? "text-green-400"
                              : results.sentimentScore >= 40
                              ? "text-yellow-400"
                              : "text-red-400"
                          }`}
                        >
                          {results.sentimentScore}
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            results.sentimentScore >= 70
                              ? "bg-gradient-to-r from-green-500 to-emerald-500"
                              : results.sentimentScore >= 40
                              ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                              : "bg-gradient-to-r from-red-500 to-pink-500"
                          }`}
                          style={{ width: `${results.sentimentScore}%` }}
                        />
                      </div>
                    </div>

                    {/* Brand Safety */}
                    <div className="bg-black/30 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-sm">Brand Safety</h4>
                        {results.brandSafe ? (
                          <CheckCircle2 className="w-5 h-5 text-green-400" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-red-400" />
                        )}
                      </div>
                      <p className="text-xs text-gray-400">
                        {results.brandSafe
                          ? "Post is brand-safe and professional"
                          : "Post may contain risky language for sponsors"}
                      </p>
                    </div>

                    {/* Predicted Engagement */}
                    <div className="bg-black/30 rounded-xl p-4">
                      <h4 className="font-bold text-sm mb-3">Predicted Engagement</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <ThumbsUp className="w-4 h-4 text-blue-400" />
                            <span className="text-xs">Likes</span>
                          </div>
                          <span className="font-semibold text-sm">
                            ~{results.engagement}K
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Share2 className="w-4 h-4 text-green-400" />
                            <span className="text-xs">Shares</span>
                          </div>
                          <span className="font-semibold text-sm">
                            ~{Math.floor(results.engagement / 10)}K
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-purple-400" />
                            <span className="text-xs">Reach</span>
                          </div>
                          <span className="font-semibold text-sm">
                            ~{results.engagement * 3}K
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Controversy Risk */}
                    <div className="bg-black/30 rounded-xl p-4">
                      <h4 className="font-bold text-sm mb-3">Controversy Risk</h4>
                      <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                        <div
                          className={`h-2 rounded-full ${
                            results.controversy < 30
                              ? "bg-gradient-to-r from-green-500 to-emerald-500"
                              : results.controversy < 60
                              ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                              : "bg-gradient-to-r from-red-500 to-pink-500"
                          }`}
                          style={{ width: `${results.controversy}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-400">
                        {results.controversy < 30
                          ? "Low risk - safe to post"
                          : results.controversy < 60
                          ? "Moderate risk - consider revising"
                          : "High risk - strongly recommend changes"}
                      </p>
                    </div>

                    {/* AI Suggestions */}
                    <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <Sparkles className="w-4 h-4 text-blue-400 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-sm mb-2">AI Suggestions</h4>
                          <ul className="text-xs text-gray-300 space-y-1">
                            {results.sentimentScore < 70 && (
                              <li>• Consider adding gratitude or team recognition</li>
                            )}
                            {!results.brandSafe && (
                              <li>• Reduce excessive punctuation or ALL CAPS</li>
                            )}
                            {results.controversy > 50 && (
                              <li>• Avoid calling out refs or league decisions</li>
                            )}
                            <li>• Add relevant hashtags for visibility</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Mobile: Examples Tab */}
          {mobileTab === "examples" && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:hidden space-y-4"
            >
              <h3 className="text-xl font-bold mb-4">
                Good vs. Bad Responses
              </h3>

              {/* Good Example */}
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <h4 className="font-bold text-green-400 text-sm">Good Example</h4>
                </div>
                <p className="text-gray-200 italic mb-3 text-sm">
                  "{scenarioContent[selectedScenario].goodExample}"
                </p>
                <ul className="text-xs text-gray-300 space-y-1">
                  <li>✓ Brand-safe tone</li>
                  <li>✓ Team-first mentality</li>
                  <li>✓ Professional and grateful</li>
                </ul>
              </div>

              {/* Bad Example */}
              <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 border border-red-500/30 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <ThumbsDown className="w-5 h-5 text-red-400" />
                  <h4 className="font-bold text-red-400 text-sm">Bad Example</h4>
                </div>
                <p className="text-gray-200 italic mb-3 text-sm">
                  "{scenarioContent[selectedScenario].badExample}"
                </p>
                <ul className="text-xs text-gray-300 space-y-1">
                  <li>✗ Too aggressive or emotional</li>
                  <li>✗ Brand risk</li>
                  <li>✗ May alienate fans</li>
                </ul>
              </div>

              {/* Key Takeaways */}
              <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-2xl p-4">
                <h4 className="font-bold mb-2 text-sm">Key Takeaways</h4>
                <ul className="text-xs text-gray-300 space-y-1">
                  <li>• Practice high-pressure scenarios safely</li>
                  <li>• Learn what sponsors want to see</li>
                  <li>• Develop authentic, professional voice</li>
                </ul>
              </div>
            </motion.div>
          )}

          {/* Desktop: Examples Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="hidden lg:block mb-16"
          >
            <h3 className="text-2xl font-bold mb-6">
              Example: Good vs. Bad Responses
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Good Example */}
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                  <h4 className="font-bold text-green-400">Good Example</h4>
                </div>
                <p className="text-gray-200 italic mb-4">
                  "{scenarioContent[selectedScenario].goodExample}"
                </p>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>✓ Brand-safe tone</li>
                  <li>✓ Team-first mentality</li>
                  <li>✓ Professional and grateful</li>
                </ul>
              </div>

              {/* Bad Example */}
              <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 border border-red-500/30 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <ThumbsDown className="w-6 h-6 text-red-400" />
                  <h4 className="font-bold text-red-400">Bad Example</h4>
                </div>
                <p className="text-gray-200 italic mb-4">
                  "{scenarioContent[selectedScenario].badExample}"
                </p>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>✗ Too aggressive or emotional</li>
                  <li>✗ Brand risk</li>
                  <li>✗ May alienate fans</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Desktop: Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="hidden lg:block text-center bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-3xl p-12"
          >
            <h3 className="text-4xl font-bold mb-6">
              Train Before the Moment Happens
            </h3>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              AIST helps athletes develop brand-safe instincts, avoid
              controversy, and maintain professional tone—even under pressure.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              {[
                {
                  title: "Crisis Prevention",
                  description: "Practice high-pressure scenarios safely",
                },
                {
                  title: "Brand Protection",
                  description: "Learn what sponsors want to see",
                },
                {
                  title: "Tone Refinement",
                  description: "Develop authentic, professional voice",
                },
              ].map((item) => (
                <div key={item.title}>
                  <h4 className="font-bold mb-2">{item.title}</h4>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
