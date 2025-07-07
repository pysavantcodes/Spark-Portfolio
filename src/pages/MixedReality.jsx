import React, { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaFilePdf, FaWhatsapp } from "react-icons/fa";
import { companies } from "../utils/data";
import Slider from "react-infinite-logo-slider";
import Footer from "../components/Footer";
import { AnimatePresence, motion } from "framer-motion";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    project: "",
    interests: [],
    budget: "",
    deadline: "",
    fullName: "",
    email: "",
    phone: "",
    website: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const videoRef = useRef(null);

  const testimonials = [
    {
      name: "Tamara Ismay Victoria",
      rating: 5,
      position: "Co-founder IYA",
      text: "Working with Spark has been an exceptional experience! My business partner and I designed our own product, and we needed detailed 3D renders to give our manufacturer a clear and precise vision. Lanre delivered beyond our expectations with incredibly detailed and accurate 3D renderings, showcasing his extraordinary precision and creativity. What truly sets him apart is his excellent communication— he's attentive, asks the right questions, and ensures that every detail is understood perfectly. His professionalism and dedication to quality make him a standout collaborator. I highly recommend Lanre to anyone looking for top-tier 3D rendering and design services!",
      avatar: "TS",
      image: "https://i.postimg.cc/W4sCS5nJ/PHOTO-2025-07-07-18-31-07.jpg",
    },
    {
      name: "Cathy-Mae SitaRam",
      rating: 5,
      position: "Film Producer (Upwork)",
      text: "This is THE best vfx artist that I have worked with on this site. Incredible. Im doing a sci-fi film. Heavy, complicated vfx. He makes the work look easy.",
      avatar: "SJ",
    },
    {
      name: "Jennifer",
      position: "Ceo Omaricode",
      rating: 5,
      text: "Absolutely! Working with you has been an incredible experience. Your creativity, professionalism, and attention to detail are unmatched. The CGI video you created exceeded my expectations and perfectly captured my vision.",
      avatar: "MC",
      image: "https://i.postimg.cc/pTT7My3W/PHOTO-2025-07-07-18-31-07-3.jpg",
    },
    {
      name: "Sam Ojie",
      position: "CEO Workcity",
      rating: 5,
      text: "Olanrewaju is fantastic and a member of our team. We love working with him.",
      avatar: "MC",
      image: "https://i.ibb.co/bM6sq8tW/PHOTO-2025-07-07-18-31-07-2.jpg",
    },
  ];

  useEffect(() => {
    document.body.style.position = "relative";
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  }, []);

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleInterestToggle = (interest) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (
        !formData.project ||
        formData.interests.length === 0 ||
        !formData.budget
      ) {
        toast.error(
          "Please fill in all required fields: Project description, interests, and budget are required."
        );
        return;
      }
    }
    setCurrentStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = {
      fullName: "Full Name",
      email: "Email",
      project: "Project Description",
      budget: "Budget",
      deadline: "Deadline",
      website: "Website",
      phone: "Phone",
    };

    const missingFields = [];
    Object.entries(requiredFields).forEach(([field, label]) => {
      if (!formData[field] || formData[field].trim() === "") {
        missingFields.push(label);
      }
    });

    if (formData.interests.length === 0) {
      missingFields.push("Interests");
    }

    if (missingFields.length > 0) {
      toast.error(
        `Please fill in all required fields: ${missingFields.join(", ")}`
      );
      return;
    }

    const toastId = toast.loading("Submitting...");

    setIsSubmitting(true);

    try {
      const form = document.createElement("form");
      form.style.display = "none";

      const fields = {
        from_name: formData.fullName,
        from_email: formData.email,
        phone: formData.phone,
        website: formData.website,
        project: formData.project,
        interests: formData.interests.join(", "),
        budget: formData.budget,
        deadline: formData.deadline,
      };

      Object.entries(fields).forEach(([name, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);

      await emailjs.sendForm(
        "service_tzr447l",
        "template_lkiwxu8",
        form,
        "ff5Jq8dUitjbknJdb"
      );

      document.body.removeChild(form);

      toast.success(
        "Form submitted successfully! We'll get back to you within 24 hours.",
        {
          id: toastId,
        }
      );

      setFormData({
        project: "",
        interests: [],
        budget: "",
        deadline: "",
        fullName: "",
        email: "",
        phone: "",
        website: "",
      });
      setCurrentStep(1);
    } catch (error) {
      console.error("Email error:", error);
      toast.error(
        "Submission failed. Please try again or contact us directly.",
        {
          id: toastId,
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const toggleFaq = (value) => {
    setOpenFaq(openFaq === value ? null : value);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        id="body"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        exit={{ opacity: 0 }}
      >
        <Toaster />
        {/* Hero Section with Video Background */}
        <section className="relative min-h-[110vh] py-20 flex overflow-hidden">
          <button
            onClick={() => {
              const pdfUrl =
                "https://drive.google.com/uc?export=download&id=1DF9qdiWX-F_Dj23BR4UE6N30ErlhxG7b";
              const link = document.createElement("a");
              link.href = pdfUrl;
              link.download = "Mixed_Reality_Presentation.pdf";
              link.target = "_blank";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="bg-[#ff9400] hover:bg-[#ff9400] text-black rounded-full font-semibold px-7 py-3.5 text-sm max-md:px-6 max-md:py-3 transition-colors flex items-center gap-3 max-md:text-xs fixed left-8 top-8 z-[9999] max-md:left-4 max-md:top-4 shadow-lg"
          >
            <FaFilePdf className="text-2xl max-md:text-xs" />
            Download Presentation
          </button>
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/mixed.mp4" type="video/mp4" />
          </video>

          <div className="absolute bg-black/70 inset-0 video-overlay"></div>

          <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-6">
            <div className="flex justify-center items-center w-full mb-5">
              <Link to={"/"}>
                <img
                  src={"/logo.svg"}
                  alt=""
                  className="h-[60px] max-md:h-[40px] object-cover  pointer-events-none select-none"
                />
              </Link>
            </div>
            <div className="mb-8 animate-fade-in">
              <p className="text-sm md:text-base uppercase tracking-wide mb-4 opacity-90">
                LIMITED BOOKINGS AVAILABLE THIS MONTH
              </p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 text-shadow">
                MIXED REALITY
                <br />
                <span className="bg-gradient-to-r from-[#ff9400] to-[#ff9400] bg-clip-text text-transparent">
                  CAMPAIGN
                </span>
              </h1>
            </div>

            {/* Form Card */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 max-w-2xl mx-auto rounded-lg">
              <div className="p-8">
                {currentStep === 1 ? (
                  <div className="space-y-6">
                    <div className="text-left">
                      <label className="block text-white font-medium mb-2">
                        Tell us about your project:
                      </label>
                      <textarea
                        placeholder="What is the concept, desired video length, and intended platform?"
                        value={formData.project}
                        onChange={(e) =>
                          handleInputChange("project", e.target.value)
                        }
                        className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/60 rounded-md px-3 py-2 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-[#ff9400]"
                        rows={3}
                      />
                    </div>

                    <div className="text-left">
                      <label className="block text-white font-medium mb-3">
                        Which of these are you interested in? (multi-select)
                      </label>
                      <div className="space-y-3">
                        {[
                          "1-3 VIDEOS",
                          "CAMPAIGN / SPECIAL PROJECT",
                          "MONTHLY CONTENT SERIES",
                        ].map((interest) => (
                          <div
                            key={interest}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="checkbox"
                              id={interest}
                              checked={formData.interests.includes(interest)}
                              onChange={() => handleInterestToggle(interest)}
                              className="w-4 h-4 rounded border-white/30 bg-transparent focus:ring-[#ff9400] accent-[#ff9400] text-yellow-400"
                            />
                            <label
                              htmlFor={interest}
                              className="text-white text-sm"
                            >
                              {interest}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="text-left">
                      <label className="block text-white font-medium mb-2">
                        What is your budget? *
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) =>
                          handleInputChange("budget", e.target.value)
                        }
                        className="w-full bg-white/10 border border-white/20 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff9400]"
                      >
                        <option value="">Choose</option>
                        <option value="$300-$500">$300 - $500</option>
                        <option value="$500-$1500">$500 - $1,500</option>
                        <option value="$1500-$7500">$1,500 - $7,500</option>
                        <option value="$7500+">$7,500+</option>
                      </select>
                    </div>

                    <button
                      onClick={handleNext}
                      className="w-full bg-[#ff9400] hover:bg-[#ff9400] text-black font-semibold py-3 text-sm rounded-md flex items-center justify-center transition-colors"
                    >
                      Next
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="text-left">
                      <label className="block text-white font-medium mb-2">
                        When do you need the project completed by?
                      </label>
                      <input
                        type="date"
                        value={formData.deadline}
                        onChange={(e) =>
                          handleInputChange("deadline", e.target.value)
                        }
                        className="w-full bg-white/10 border border-white/20 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:[#ff9400]"
                      />
                    </div>

                    <div className="text-left">
                      <label className="block text-white font-medium mb-2">
                        Full Name *
                      </label>
                      <input
                        value={formData.fullName}
                        onChange={(e) =>
                          handleInputChange("fullName", e.target.value)
                        }
                        className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/60 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff9400]"
                        placeholder="Your full name"
                        required
                      />
                    </div>

                    <div className="text-left">
                      <label className="block text-white font-medium mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/60 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff9400]"
                        placeholder="your@email.com"
                        required
                      />
                    </div>

                    <div className="text-left">
                      <label className="block text-white font-medium mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/60 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff9400]"
                        placeholder="Your phone number"
                      />
                    </div>

                    <div className="text-left">
                      <label className="block text-white font-medium mb-2">
                        Website/Social Media
                      </label>
                      <input
                        value={formData.website}
                        onChange={(e) =>
                          handleInputChange("website", e.target.value)
                        }
                        className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/60 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff9400]"
                        placeholder="Your website or social media"
                      />
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="flex-1 border border-white/20 text-white hover:bg-white/10 py-3 rounded-md transition-colors flex items-center justify-center text-sm gap-2"
                      >
                        <FaChevronLeft />
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-[#ff9400] hover:bg-[#ff9400] text-black font-semibold py-3 rounded-md transition-colors text-sm"
                      >
                        {isSubmitting ? "Submitting..." : "Submit"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Trusted By Section */}
        <section className="py-16  text-white">
          <div className="max-w-8xl mx-auto text-center">
            <h2 className="text-3xl max-md:text-2xl font-bold mb-12 px-10">
              Our Clients
            </h2>
            <div className="">
              <Slider
                className="w-full"
                width="250px"
                duration={20}
                pauseOnHover={true}
                blurBorders={true}
                blurBoderColor={"#0f0f0f"}
              >
                {companies.map((data, index) => {
                  return (
                    <Slider.Slide className="px-10 object-contain flex items-center">
                      <img
                        className={`w-full object-contain ${
                          (index == 4 || index == 8) && "invert"
                        }`}
                        key={index}
                        src={data}
                      />
                    </Slider.Slide>
                  );
                })}
              </Slider>
            </div>
          </div>
        </section>

        <section className="py-20 max-w-7xl mx-auto border-t border-white/5">
          <h2 className="text-3xl font-bold max-md:text-2xl mb-12 px-10 text-center">
            What Our Clients Say
          </h2>
          <div className="relative px-10 max-md:px-0">
            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform !items-stretch h-full duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentTestimonial * 100}%)`,
                }}
              >
                {testimonials.map((t, i) => (
                  <div
                    key={i}
                    className="w-full flex-shrink-0 px-6 flex items-stretch"
                  >
                    <div className="bg-white h-full dark:bg-zinc-900 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-zinc-200 dark:border-zinc-700 max-w-3xl mx-auto">
                      <div className="flex items-center gap-4 mb-6">
                        {t.image ? (
                          <img
                            src={t.image}
                            alt={t.name}
                            className="w-12 h-12 max-md:w-10 max-md:h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold text-xl max-md:text-lg object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 max-md:w-10 max-md:h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold text-xl max-md:text-lg">
                            {t.avatar}
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-lg max-md:text-base">
                            {t.name}
                          </p>
                          <p className="text-sm text-zinc-500">{t.position}</p>
                        </div>
                      </div>
                      <p className="text-base text-zinc-600 dark:text-zinc-300 leading-relaxed max-md:text-sm">
                        {t.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={prevTestimonial}
              className="absolute left-5 max-md:left-3 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 max-md:p-2 transition-all duration-300 border border-white/20"
              aria-label="Previous testimonial"
            >
              <svg
                className="h-6 w-6 text-white max-md:h-4 max-md:w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-5 max-md:right-3 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 max-md:p-2 transition-all duration-300 border border-white/20"
              aria-label="Next testimonial"
            >
              <svg
                className="h-6 w-6 text-white max-md:h-4 max-md:w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center space-x-2 mt-8 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={` rounded-full transition-all ${
                    index === currentTestimonial
                      ? "bg-[#ff9400] w-3 h-3"
                      : "bg-white/30 hover:bg-white/50 w-2 h-2"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}

        {/* FAQ Section */}
        <section className="py-20 bg-black text-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl max-md:text-2xl font-bold text-center mb-12">
              FAQ's
            </h2>
            <div className="space-y-4">
              {[
                {
                  id: "turnaround",
                  question:
                    "How long does it take to create a viral CGI campaign video?",
                  answer:
                    "The timeline depends on the complexity of the project, but generally, a 10-15 second CGI video can take anywhere from 1 to 3 weeks, including revisions. This timeframe covers everything from concept development to final rendering.",
                },
                {
                  id: "services",
                  question: "What materials do you need to get started?",
                  answer:
                    "To get started, l'll need a clear idea of your campaign goals, any  include, brand guidelines, and any footage or assets (e.g., product images, logos) you want incorporated.",
                },
                {
                  id: "cost",
                  question:
                    "Can the CGI video be customized for different platforms?",
                  answer:
                    "Absolutely! I can optimize the video for different platforms like Instagram, TikTok, or YouTube, ensuring the best resolution and format  your target platforms, and I'll make sure the video is suitable.",
                },
                {
                  id: "requirements",
                  question: "What's the process for revisions and feedback?",
                  answer:
                    "I usually provide 1-2 rounds of revisions based on your feedback to ensure the final result meets your expectations. We can schedule review during the project to discuss any necessary adjustments.",
                },
              ].map((faq) => (
                <div key={faq.id} className="border-b border-white/10">
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left py-4 flex justify-between items-center text-lg hover:text-[#ff9400] transition-colors max-md:text-sm"
                  >
                    <p className="text-base max-w-[80%] text-left:text-base">
                      {faq.question}
                    </p>
                    <svg
                      className={`h-5 w-5 transform transition-transform ${
                        openFaq === faq.id ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {openFaq === faq.id && (
                    <div className="pb-4 text-gray-300 opacity-70">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 bg-gradient-to-br from-[#0b1e0d] via-[#0b1e0d] to-[#0b1e0d] text-white text-center">
          <div className="max-w-4xl mx-auto px-6 text-center w-full flex flex-col items-center justify-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Let's choose the best option
              <br />
              for the goal of your brand
              <br />
              and products
            </h2>
            <button
              onClick={() =>
                window.open(
                  "https://api.whatsapp.com/message/BHJAPBNTM5SKJ1?autoload=1&app_absent=0",
                  "_blank"
                )
              }
              className="bg-green-500 hover:bg-green-600 text-black rounded-full font-semibold px-8 py-4 text-base mt-8 transition-colors flex items-center gap-3 max-md:text-sm"
            >
              <FaWhatsapp className="text-2xl max-md:text-xl" />
              Contact Us On WhatsApp
            </button>
          </div>
        </section>

        {/* <div className="flex items-center justify-start pb-8 px-8"></div> */}

        {/* Footer */}
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
