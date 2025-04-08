import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import default styles
import styles from "./Testimonials.module.css"; // Your custom styles


const testimonials = [
    {
      text: "मुझे पहले पेंसिल पकड़नी भी नहीं आती थी। अब मैं अपना नाम खुद लिख सकती हूँ।",
      name: "– प्रिया, 8 वर्ष",
    },
    {
      text: "मैं पुलिस अफसर बनना चाहती हूँ। यहाँ पढ़ाई करके मुझे लगता है कि सपना पूरा होगा।",
      name: "– नंदिनी, 12 वर्ष",
    },
    {
      text: "मैं बहुत शर्मीली थी। लेकिन दीदी ने कहा कि बोलना सीखो, अब मैं सवालों के जवाब देती हूँ।",
      name: "– अंजलि, 10 वर्ष",
    },
    {
      text: "पहले मुझे लगता था कि सिर्फ लड़के स्कूल जाते हैं। अब मैं हर दिन पढ़ती हूँ और अच्छा लगता है।",
      name: "– रेखा, 11 वर्ष",
    },
    {
      text: "मेरी माँ कभी स्कूल नहीं गई। जब वो मुझे किताबें पढ़ते देखती हैं, तो बहुत खुश होती हैं।",
      name: "– सविता, 9 वर्ष",
    },
    {
      text: "शुरू में कुछ समझ नहीं आता था। लेकिन अब मैं खुद से सवाल हल करने लगी हूँ।",
      name: "– रुचि, 10 वर्ष",
    },
    {
      text: "मैं नर्स बनकर अपने गाँव के लोगों की मदद करना चाहती हूँ, इसलिए विज्ञान पढ़ना अच्छा लगता है।",
      name: "– लता, 13 वर्ष",
    },
    {
      text: "मेरा भाई पहले मुझे पढ़ने से रोकता था, अब वह मुझसे होमवर्क में मदद माँगता है।",
      name: "– पूनम, 12 वर्ष",
    },
    {
      text: "मैंने पहली बार नानी को चिट्ठी लिखी। उन्होंने कहा बहुत खुश हुईं पढ़कर।",
      name: "– भावना, 9 वर्ष",
    },
    {
      text: "कक्षा में आना मेरे दिन का सबसे अच्छा हिस्सा होता है — पढ़ाई, खेल और दोस्त सब मिलते हैं।",
      name: "– राधा, 11 वर्ष",
    },
  ];
  

const Testimonials = () => {
  return (
    <div className={styles.section}>
      <h2>In Their Words</h2>
      <Carousel
  autoPlay
  infiniteLoop
  showArrows={false}
  showStatus={false}
  showThumbs={false}
  centerMode
  centerSlidePercentage={33.33}
  emulateTouch
  swipeable
  transitionTime={300}
  interval={3000}
  className={styles.testimonialCarousel} // 👈 Add a custom class
>
  {testimonials.map((testimonial, index) => (
    <div key={index} className={styles.carouselItem}>
      <div className={styles.testimonialCard}>
        <p>"{testimonial.text}"</p>
        <h4>{testimonial.name}, {testimonial.age}</h4>
      </div>
    </div>
  ))}
</Carousel>

    </div>
  );
};

export default Testimonials;
