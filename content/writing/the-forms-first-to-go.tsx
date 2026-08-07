/**
 * Body for /writing/the-forms-first-to-go.
 *
 * Two voices in one page. The 2026 frame is new; everything below the
 * `archival` rule is the 2021 note reproduced verbatim, including its
 * spaced hyphens and its "FB"/"amt" shorthand. Do not copy-edit that half.
 */

import Image from 'next/image';


function Fig({ src, alt, cap, w, h, portrait }: { src: string; alt: string; cap: string; w: number; h: number; portrait?: boolean }) {
  return (
    <figure className={portrait ? 'portrait' : undefined}>
      <Image src={src} alt={alt} width={w} height={h} sizes="(min-width: 768px) 36em, 100vw" />
      <figcaption>{cap}</figcaption>
    </figure>
  );
}

function Step({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '1.1em', alignItems: 'baseline' }}>
      <div style={{ fontStyle: 'italic', opacity: 0.6, whiteSpace: 'nowrap' }}>{n}</div>
      <p style={{ margin: 0 }}>{children}</p>
    </div>
  );
}

export default function Body() {
  return (
    <>
      <Fig src="/writing/bike-jeopardy.jpg" w={1050} h={1400} portrait
        alt="A Peloton screen mid-class showing live output, cadence, resistance and a power-zone bar, with Jeopardy playing on the television behind it."
        cap="&ldquo;I never have to stop for red lights, go as fast as I want, AND I can watch Jeopardy reruns.&rdquo; Written in 2021. Photographed this year, which is rather the point." />

      {/* ─── the 2026 frame ─────────────────────────────────────────── */}
      <p>
        In 2021 what broke my pacing was that the boundaries went away. The office was
        the kitchen, the kitchen was the school, and the small places I used to recover
        in, the walk to get coffee, the aimless conversation by the micro-kitchen,
        quietly stopped existing.
      </p>
      <p>
        Five years later the boundaries are mostly back. I can leave the house. Nobody is
        doing algebra at the table while I take a call. And I&rsquo;m worse at pacing than
        I was then.
      </p>
      <p>
        Here&rsquo;s what changed. Capacity used to be the scarce thing. What I could get
        done in a day was limited by how fast I could actually do it, and that limit did
        some of the work of stopping me. That limit is gone. I can work alongside
        something that doesn&rsquo;t get tired, doesn&rsquo;t lose focus at four in the
        afternoon, and will happily keep going at three in the morning. The ceiling on
        what a day can contain moved, and it moved a long way.
      </p>
      <p>What didn&rsquo;t move is me.</p>
      <p>
        The power-zone material below is really a model of that gap. Zone 7 has always
        existed and has always been available. Anyone can produce max effort. The insight
        of the training program was that <em>available</em> and <em>sustainable</em> are
        two different numbers, and the second one is the one that matters. You
        don&rsquo;t get fitter by discovering you can hit Zone 7. You get fitter by
        knowing how long you can hold each zone and building everything else around it.
      </p>
      <p>
        Working with AI feels like permanent access to Zone 7. Which is genuinely great,
        and I wouldn&rsquo;t give it back. But the tells I wrote about in 2021 are harder
        to catch now, because the work still looks fine. A shorter fuse, less filter,
        quality slipping: those used to show up in what I made. Now they mostly show up
        in me, and the output covers for me.
      </p>
      <p>
        So the note holds up, but the reason changed. In 2021 I needed to pace because
        the world had taken my recovery zones away. Now I need to pace because nothing is
        taking anything away, and there is no natural place to stop.
      </p>

      <p>
        Which leaves the question I have not answered. When the machine takes the load off,
        do you take the time back, or do you just do more? I keep choosing more. I do
        not think that is a decision I am making so much as one I am defaulting into, and
        the difference between those two things is the whole of what I learned on the bike.
      </p>

      {/* ─── the seam ───────────────────────────────────────────────── */}
      <hr />
      <p className="e-label">The 2021 note follows, unchanged.</p>

      {/* ─── 2021, verbatim ─────────────────────────────────────────── */}
      <p>
        About one year ago, we all began working from home, or &ldquo;sleeping from the
        office&rdquo; as some have come to say. For me, this also meant my home-office
        was also a homeschool, and to cope I needed a way to get some physical activity.
        Like many, I was uncomfortable doing this outdoors, and dusted off my Peloton to
        get some exercise indoors. I&rsquo;ve loved riding this silly screenbike during
        the pandemic - I never have to stop for red lights, go as fast as I want, AND I
        can watch Jeopardy reruns. That being said, exercise bikes can&rsquo;t go
        downhill, and it takes a lot of effort to make sure my body can keep up with my
        mind&rsquo;s delusions of being an endurance athlete early in the morning.
      </p>
      <Fig src="/writing/desk-drawings.jpg" w={1600} h={1200}
        alt="A home desk with a work monitor showing chat and a full calendar, a video call to family, and a wall covered in children&rsquo;s drawings."
        cap="The office was the kitchen." />

      <p>
        Like many at FB I&rsquo;ve heard folks say &ldquo;working here is a marathon not
        a sprint&rdquo;, which is true. What is also true however, is that endurance
        athletes know their bodies and tempos so well that they can accelerate and
        decelerate when necessary, using form to throttle themselves when they need to
        recover. Here&rsquo;s some perspective I&rsquo;ve gained, and steps you can take
        when you may have been pushing yourself too hard for too long.
      </p>

      <p className="e-label" style={{ marginTop: '3em' }}>The Basics + Some Preventative Steps</p>

      <p>
        The philosophy of the training program I&rsquo;ve been doing is basic -
        one&rsquo;s physical body is the engine for your bicycle, and your output can be
        broken down into 7 zones of effort (shown to the right [below]). Zone 1 is easy peasy
        lemon squeezy and Zone 7 is difficult difficult lemon difficult. The more
        difficult the zone, the less capable a human is of sustaining the effort for a
        long time. This is true if you are Matt Hanson the Design Manager or Matt Hanson
        the world champion triathlete.
      </p>

      <figure className="my-10">
        <Image
          src="/writing/seven-zones.png"
          alt="The 7 training zones, from Zone 1 Very Easy at under 55% of FTP to Zone 7 Max Effort above 151% of FTP, each with how long it can be sustained. Zone 7 is highlighted."
          width={1080}
          height={1350}
          className="w-full h-auto"
          sizes="(min-width: 768px) 42rem, 100vw"
        />
        <figcaption className="font-mono text-caption text-[var(--era-ink-muted)] mt-3 text-center">
          The &ldquo;7 Zones&rdquo;. FTP = the average output you can sustain.
        </figcaption>
      </figure>

      <p>
        As people, we are capable of so much, and in knowing our physical limits, we can
        sustain great efforts for long periods of time. When I first started riding, I
        could barely ride longer than 20 minutes. When my form began to crumble, I
        experienced pain. The harder I pushed, more it hurt. By improving my form and
        understanding where, when, and how I needed to recover (both on and off the bike)
        I made great progress.
      </p>
      <Fig src="/writing/desk-child.jpg" w={1600} h={1200}
        alt="A home office with a standing desk, and a child sitting on an office chair beside it."
        cap="And the kitchen was the school." />

      <p>
        While we are working from home, it can be difficult to find places to slow down
        and recover. Where we may once have found &ldquo;recovery&rdquo; in chatting in
        the micro kitchen, reflecting at the sweet shop, or grabbing coffee with someone
        at Philz, our &ldquo;recovery zones&rdquo; now contend with significant
        obligations ranging from family responsibilities to the spectre of loneliness.
        Make sure to take room to reduce the amt of energy you spend from time to time,
        and even try to build it into your planning proactively, to make sure we can all
        be effective in the long haul.
      </p>
      <p>
        By understanding form, and how to leverage it effectively, I made significant
        sustainable improvements. Here are some steps I have found helpful for me YMMV;
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4em', margin: '2em 0' }}>
        <Step n="Step 01">
          Understand your &ldquo;professional form&rdquo; as a continuum from &ldquo;i
          love this, everything about it, I&rsquo;m buying dinner for everyone!&rdquo; to
          &ldquo;IDK if I can do this for 5 more minutes without kicking
          something&rdquo;. Are you aware of what happens when you are in Zone 7 - max
          effort hellscape - for too long? Maybe it&rsquo;s a shorter fuse, less of a
          filter, or your quality takes a hit. Be mindful of your patterns, and
          understand what they look like.
        </Step>
        <Step n="Step 02">
          When you notice these patterns pay attention, you are &ldquo;smelling
          smoke&rdquo;. Have you been pushing too hard for too long without recovering?
          Are you losing your form in other areas? If so&hellip;
        </Step>
        <Step n="Step 03">
          Actively try to pedal down and recover. Take it slow for a bit to be safe. On
          one end of the spectrum, this could be walking away from the computer for 10
          minutes and getting some sunshine or meditating. On the other end, this could
          mean communicating to your partners and manager that you need to adjust your
          calendar or take a day to make the space you need to make things more
          sustainable.
        </Step>
      </div>

      <hr />

      <Fig src="/writing/bike-view.jpg" w={1200} h={1600} portrait
        alt="The view from a Peloton in 2021: the bike screen dark, a child&rsquo;s playroom beyond it."
        cap="The view from the bike, 2021. The screen is off; the room is not." />

      <p>
        Applying what I learned as a fake-cyclist to my professional form has really
        helped me keep pace during this time. While this note wasn&rsquo;t intended to
        help anyone become an endurance athlete, I hope what I learned while pretending
        to be one can help you when the pace feels grueling.
      </p>
    </>
  );
}
