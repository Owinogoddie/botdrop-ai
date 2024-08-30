'use client'
import { useRef, useEffect, RefObject } from 'react';

interface Testimonial {
  name: string;
  company: string;
  quote: string;
}

const testimonials: Testimonial[] = [
  { name: "John Doe", company: "Tech Co.", quote: "BotDrop AI transformed our customer service." },
  { name: "Jane Smith", company: "E-commerce Inc.", quote: "Our lead generation improved by 200% with BotDrop AI." },
  { name: "Mike Johnson", company: "Consulting LLC", quote: "The customization options are unparalleled." },
  { name: "Sarah Brown", company: "StartUp Hub", quote: "BotDrop AI's analytics helped us understand our customers better." },
];

export default function Testimonials() {
  const marqueeRef: RefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    let scrollAmount = 0;
    const speed = 0.5;

    const step = () => {
      if (!marquee) return;
      marquee.style.transform = `translateX(${-scrollAmount}px)`;
      scrollAmount += speed;

      if (scrollAmount >= marquee.offsetWidth / 2) {
        scrollAmount = 0;
      }

      requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, []);

  return (
    <section className="py-20 bg-light overflow-hidden">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Our Customers Say</h2>
        <div className="relative">
          <div className="overflow-hidden">
            <div ref={marqueeRef} className="flex whitespace-nowrap">
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <div key={index} className="inline-block w-80 mx-4 bg-white p-6 rounded-lg shadow-md">
                  <p className="mb-4 italic">&quot;{testimonial.quote}&quot;</p>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.company}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
