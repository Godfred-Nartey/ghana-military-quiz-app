import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';

const heroSlides = [
  {
    src: '/hero-slides/slide-1.jpg',
    alt: 'Soldiers boarding a military transport vehicle',
  },
  {
    src: '/hero-slides/slide-2.jpg',
    alt: 'A soldier in protective gear holding a rifle',
  },
  {
    src: '/hero-slides/slide-3.jpg',
    alt: 'A soldier standing in a desert training environment',
  },
  {
    src: '/hero-slides/slide-4.jpg',
    alt: 'A military ship stationed on calm water',
  },
];

function Home() {
  const { isAuthenticated } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[80vh]">
      {/* Hero Section */}
      <section className="relative max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-primary-200/50 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-secondary-200/50 blur-3xl" />
        <div className="pointer-events-none absolute right-1/4 bottom-0 h-48 w-48 rounded-full bg-primary-300/30 blur-3xl" />
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative z-10 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Test Your Knowledge of the{' '}
              <span className="text-gradient">Ghana Military</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              Challenge yourself with questions about Ghana's military history,
              operations, and achievements. Learn while you play!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              {isAuthenticated ? (
                <Link to="/dashboard" className="btn-primary text-lg px-8 py-3">
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/register" className="btn-primary text-lg px-8 py-3">
                    Get Started
                  </Link>
                  <Link to="/login" className="btn-outline text-lg px-8 py-3">
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="pointer-events-none absolute -inset-16 rounded-full bg-primary-100/60 blur-3xl" />
            <div className="pointer-events-none absolute -inset-10 rounded-full bg-white/70 blur-2xl" />
            <div className="pointer-events-none absolute -inset-4 rounded-[3rem] bg-gradient-to-br from-primary-50/80 via-white/60 to-secondary-50/80 blur-xl" />

            <div
              className="relative h-[340px] w-full overflow-hidden rounded-[2rem] shadow-2xl md:h-[460px]"
              style={{
                maskImage:
                  'radial-gradient(ellipse 90% 90% at 50% 50%, black 60%, transparent 100%)',
                WebkitMaskImage:
                  'radial-gradient(ellipse 90% 90% at 50% 50%, black 60%, transparent 100%)',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={heroSlides[currentSlide].src}
                  src={heroSlides[currentSlide].src}
                  alt={heroSlides[currentSlide].alt}
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={{ opacity: 0.25, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0.2, scale: 0.98 }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                />
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-gray-950/10 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20" />

              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-5 md:p-6">
                <div className="max-w-sm text-left text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-200">
                    Hero Gallery
                  </p>
                  <p className="mt-2 text-sm text-gray-100 md:text-base">
                    Military-inspired visuals rotate automatically.
                  </p>
                </div>

                <div className="flex gap-2">
                  {heroSlides.map((slide, index) => (
                    <button
                      key={slide.src}
                      type="button"
                      onClick={() => setCurrentSlide(index)}
                      aria-label={`Show slide ${index + 1}`}
                      className={`h-2.5 rounded-full transition-all ${
                        currentSlide === index
                          ? 'w-8 bg-white'
                          : 'w-2.5 bg-white/50 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Why Take Our Quiz?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="card p-6 text-left">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Learn Military History
            </h3>
            <p className="text-gray-600">
              Discover fascinating facts about Ghana's military heritage,
              from independence to modern operations.
            </p>
          </div>

          <div className="card p-6 text-left">
            <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-secondary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Track Your Progress
            </h3>
            <p className="text-gray-600">
              See your scores improve over time with detailed statistics
              and performance analytics.
            </p>
          </div>

          <div className="card p-6 text-left">
            <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-gold-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Earn Achievements
            </h3>
            <p className="text-gray-600">
              Unlock badges and earn points as you complete quizzes
              and reach milestones.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-primary-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Test Your Knowledge?</h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are learning about Ghana's military
            through our interactive quizzes.
          </p>
          {!isAuthenticated && (
            <Link
              to="/register"
              className="inline-block bg-white text-primary-600 font-semibold px-8 py-3 rounded-lg hover:bg-primary-50 transition-colors"
            >
              Create Free Account
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
