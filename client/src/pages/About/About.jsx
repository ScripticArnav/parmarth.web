import React, { useEffect, useState } from "react";
import styles from "./About.module.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const InfiniteScroll = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  // Next Slide
  const nextSlide = () => {
    setIsSliding(true);
    setTimeout(() => {
      currentIndex < images.length - 1
        ? setCurrentIndex(currentIndex + 1)
        : setCurrentIndex(0);
    }, 100);
  };

  // Previous Slide
  const prevSlide = () => {
    setIsSliding(true);
    setTimeout(() => {
      currentIndex > 0
        ? setCurrentIndex(currentIndex - 1)
        : setCurrentIndex(images.length - 1);
    }, 100);
  };

  // Auto-scroll logic
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval ); // Clean up interval
  }, [currentIndex]);

  return (
    <div className={styles.sliderWrapper}>
      {/* Left Button */}
      <button onClick={prevSlide} className={styles.navButton} id={styles.prev}>
        <FaChevronLeft />
      </button>

      <div className={styles.sliderContainer}>
        <div
          className={`${styles.slider} ${
            isSliding ? styles.slideTransition : ""
          }`}
        >
          <div className={styles.slide}>
            <img src={images[currentIndex]} alt={`slide-${currentIndex}`} />
          </div>
        </div>
      </div>

      {/* Right Button */}
      <button onClick={nextSlide} className={styles.navButton} id={styles.next}>
        <FaChevronRight />
      </button>
    </div>
  );
};

const About = () => {
  const images = [
    "/img/About/1.png",
    "/img/About/2.png",
  ];
  return (
    <>
      {/* <Navbar /> */}
      <div style={{ paddingTop: "120px" }} className={styles.body}>

        <div className={styles.section}>
                  <InfiniteScroll images={images} />
                </div>
        {/* History of Parmarth */}
        <div className={styles.section}>
          <h1>Parmarth</h1>
          <p>
          Journey of Club started in 2015. Back in those times, their was a huge
          amount of child beggars on the college road and college chauraha.
          Those little beggars use to beg for little food or some money. Such
          children can be seen everywhere but are not often noticed. Some golden
          heart IETians noticed that childhood which is begging and crying for
          food. They can either have given some money or some food, but it will
          never be able to make any difference in their lives. To create a
          positive difference in their lives, they thought of imparting
          education because they know well that education is the only tool that
          can shape lives. For a start, beggar's event was organised for
          motivating little beggars and creating an interest for study. It was a
          4 day long event in which children were both fed and taught. On
          subsequent days of event amount of food decreased and amount of
          teaching increased. Once, children developed interest, volunteers
          started to teach them in their slums. Seeing dedication of volunteers,
          college allowed us to teach those children in college premises.
          </p>
          <p>
            The organization has expanded its reach through various initiatives
            aimed at nurturing young minds and fostering a sense of
            responsibility towards society.
          </p>
        </div>

        {/* Age of Parmarth */}
        <div className={styles.section}>
          <h2>This Day & Age</h2>
          <p>
          Today, club is well structured and follows college hierarchy. More
          than 200 volunteers from all the streams and courses are associated
          with the club every year. Nearly 150 children visit us in evening on a
          regular basis for their education. Imparting regular education to them
          is now termed as LT teaching. Beside this we work with 3 more wings,
          namely Girls Education wing, Schooling wing and Social Service wing.
          In Girls Education wing, we educate teenage girl and women of slums in
          their slum. Girl volunteers of club visit them on a daily basis and
          impart social, sociological and behavioural knowledge along with
          elementary education. In schooling wing, we admit children in private
          schools through Right to Education Act. We work on all fronts of
          admission i.e pre admission, admission and post admission. Pre
          admission include doing survey, collecting documents and filling of
          forms. Admission include admitting them in schools and providing
          financial help if needed. Post admission include their regular
          monitoring. Till date we have admitted more than 120 slum children in
          private schools through RTE. In Social service wing, we do a lot on
          social front for upgrading life of slum dwellers and creating a
          positive change in society. Certain events are organised regularly to
          serve the purpose such as cleanliness event, cloth distribution event,
          blood donation event, medical camps etc. Parmarth with all its four
          wings is always dedicated to make a positive difference in lives.
          Little we have walked and there are miles to go. Maybe someday world
          will be a better place for all, and what it demands is a little
          humanity from us, from you and from everyone else.
          </p>
        </div>

        {/* Vision of Parmarth */}
        <div className={styles.section}>
          <h2>Vision of Parmarth</h2>
          <p>
            Our vision is to create an inclusive society where every child,
            regardless of their background, has the opportunity to realize
            their full potential. We aim to equip children with the necessary
            skills and knowledge to become responsible citizens and future
            leaders.
          </p>
        </div>

        {/* Mission of Parmarth */}
        <div className={styles.section}>
          <h2>Mission of Parmarth</h2>
          <p>
            The mission of Parmarth is to:
          </p>
          <ul>
            <li>Provide quality education and skill development.</li>
            <li>Promote awareness of social and environmental responsibilities.</li>
            <li>Empower children through mentorship and guidance.</li>
            <li>Create a nurturing environment that fosters creativity and innovation.</li>
          </ul>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default About;
