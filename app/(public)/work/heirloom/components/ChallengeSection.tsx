// components/ChallengeSection.tsx

export default function ChallengeSection() {
  return (
    <section className="bg-gray-50 py-12 md:py-16 lg:py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-6 text-2xl md:text-3xl lg:text-4xl font-bold text-[#2D2D2D] md:text-5xl">
            The Challenge
          </h2>
          <p className="mb-6 text-lg text-gray-700 max-w-3xl">
            Recipe apps treat your family's culinary heritage like generic data.
          </p>

          <div className="space-y-6 text-base text-gray-700 leading-relaxed">
            <p>
              Your grandmother's handwritten chicken soup recipe is <span className="font-bold text-[#2D2D2D]">fading in a kitchen drawer</span>. Your mom's famous chocolate chip cookies exist only in her memory. That casserole your dad makes every Thanksgiving? Scattered across three different text messages from 2019.
            </p>
            <p>
              You could put them in a notes app—but then they're just text. You could use a meal planner—but those are built for diet optimization, not family traditions. You could subscribe to a recipe service—but <span className="font-bold text-[#2D2D2D]">why pay monthly to access recipes you already own?</span>
            </p>

            {/* Key Pain Points - Bullet List */}
            <ul className="mt-8 space-y-4 list-none">
              <li className="flex items-start gap-3">
                <span className="text-[#E85D4D] text-xl leading-none mt-1">•</span>
                <div>
                  <span className="font-bold text-[#2D2D2D]">Lost Heritage:</span>
                  <span className="text-gray-700"> Paper recipes fade, handwriting becomes illegible, family stories disappear with each generation</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#E85D4D] text-xl leading-none mt-1">•</span>
                <div>
                  <span className="font-bold text-[#2D2D2D]">Manual Digitization:</span>
                  <span className="text-gray-700"> Typing recipes from cookbooks is tedious. OCR apps get fractions wrong. Existing tools require heavy editing.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#E85D4D] text-xl leading-none mt-1">•</span>
                <div>
                  <span className="font-bold text-[#2D2D2D]">Feature Overload:</span>
                  <span className="text-gray-700"> Meal planners prioritize algorithms and nutritional data over the warmth of family connection</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#E85D4D] text-xl leading-none mt-1">•</span>
                <div>
                  <span className="font-bold text-[#2D2D2D]">Subscription Fatigue:</span>
                  <span className="text-gray-700"> Pay $5-15/month forever to access recipes that belong to you and your family, friends, and community</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
