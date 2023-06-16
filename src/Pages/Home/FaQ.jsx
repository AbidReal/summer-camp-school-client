import { Transition } from "@headlessui/react";
import { useState, useEffect } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import Aos from "aos";
import "aos/dist/aos.css";

const FaQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const faqData = [
    {
      question:
        "How can I enroll myself or my child in a martial arts class at FistZen?",
      answer:
        "To enroll in a martial arts class at FistZen, you need to sign in to your account, navigate to the class registration page, and select the desired class. Follow the prompts to complete the enrollment process and make the payment.",
    },
    {
      question:
        "Are there any age restrictions for the martial arts classes at FistZen?",
      answer:
        "The martial arts classes at FistZen are designed for participants of various age groups. We offer classes for kids as young as 5 years old up to adults. Each class is tailored to suit the specific age and skill level of the participants.",
    },
    {
      question: "What martial arts styles are taught at FistZen?",
      answer:
        "FistZen offers a range of martial arts styles, including Karate, Taekwondo, Judo, and Brazilian Jiu-Jitsu. Each style has its unique techniques and philosophies, providing students with a diverse learning experience.",
    },
    {
      question: "Are the martial arts classes suitable for beginners?",
      answer:
        "Absolutely! Our martial arts classes at FistZen cater to students of all skill levels, including beginners. Our experienced instructors will guide and support beginners through the fundamental techniques and gradually progress to more advanced skills.",
    },
    {
      question:
        "Can I purchase multiple martial arts classes for myself or my child?",
      answer:
        "Yes, you can purchase multiple martial arts classes for yourself or your child at FistZen. Our registration system allows you to select and add multiple classes to your cart before making the payment. This way, you can explore different martial arts disciplines and enjoy a well-rounded experience.",
    },
  ];

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto mb-10" data-aos="fade-up">
      <div className="text-center font-extrabold text-5xl pt-10 lg:pt-40 pb-4 lg:pb-10">
        Frequently Asked Questions
      </div>
      {faqData.map((faq, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-lg mb-4 overflow-hidden"
        >
          <div
            className="flex justify-between items-center cursor-pointer p-4 bg-gradient-to-r from-red-400 to-red-600 rounded-t-lg"
            onClick={() => toggleAccordion(index)}
          >
            <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
            <span className="ml-2">
              {activeIndex === index ? (
                <IoIosArrowUp className="w-6 h-6 text-white" />
              ) : (
                <IoIosArrowDown className="w-6 h-6 text-white" />
              )}
            </span>
          </div>
          <Transition
            show={activeIndex === index}
            enter="transition duration-1000 ease-out"
            enterFrom="opacity-0 max-h-0"
            enterTo="opacity-100 max-h-full"
            leave="transition duration-1000 ease-out"
            leaveFrom="opacity-100 max-h-full"
            leaveTo="opacity-0 max-h-0"
            className="overflow-hidden"
          >
            <div className="p-4 text-lg">{faq.answer}</div>
          </Transition>
        </div>
      ))}
    </div>
  );
};

export default FaQ;
