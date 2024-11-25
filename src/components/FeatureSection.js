import React, {useEffect} from "react";
import "../styles/FeatureSection.css";
import blousebleu from "../images/medicine-uniform-healthcare-medical-workers-day-space-text.jpg"

const features = [
  {
    
    id: 1,
    title: "Fièrement 100% Algérien 1",
    description: "Nos tenues de bloc sont conçues et fabriquées en Algérie, avec un savoir-faire local qui met en valeur les talents de nos artisans et industriels. En choisissant nos produits, vous soutenez l’économie locale tout en bénéficiant d’une qualité irréprochable.",
    image: blousebleu,
  },
  {
    id: 2,
    title: "Confort Absolu, Toute la Journée",
    description: "Nous comprenons l’importance du confort dans votre métier. C’est pourquoi nos tenues sont confectionnées dans des matières respirantes, légères et douces au toucher, pour vous permettre de rester à l’aise, même pendant les journées les plus chargées.",
    image: blousebleu,
  },
  {
    id: 3,
    title: "Hygiène et Sécurité Optimales",
    description: "Parce que votre sécurité et celle de vos patients sont primordiales, nos tenues respectent les normes les plus strictes en matière d’hygiène. Elles sont conçues pour résister aux lavages fréquents tout en préservant leur qualité et leur aspect neuf.",
    image: blousebleu,
  },
  {
    id: 4,
    title: "Style Professionnel Élégant",
    description: "Qui a dit que les tenues de bloc ne pouvaient pas être stylées ? Avec des coupes modernes et des finitions soignées, nos vêtements allient fonctionnalité et élégance pour refléter votre professionnalisme.",
    image: blousebleu,
  },
  {
    id: 5,
    title: "Durabilité Qui Fait la Différence",
    description: "Nos tenues de bloc sont conçues pour durer. Grâce à des matériaux résistants et une confection soignée, elles supportent les lavages intensifs tout en conservant leur qualité, leur confort et leur apparence impeccable au fil du temps.",
    image: blousebleu,
  },
];

const FeatureSection = () => {
    useEffect(() => {
        const boxes = document.querySelectorAll(".feature-box");
    
        const observer = new IntersectionObserver(
          (entries, observer) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("visible"); // Ajoute la classe visible
                observer.unobserve(entry.target); // Arrête d'observer une fois visible
              }
            });
          },
          { threshold: 0.1 } // Détecte quand 10% de l'élément est visible
        );
    
        boxes.forEach((box) => observer.observe(box));
      }, []);

      return (
        <section className="feature-section">
          <div className="grid-container">
            {features.map((feature) => (
              <div key={feature.id} className={`feature-box box-${feature.id}`}>
                <div className="feature-image">
                  <img src={feature.image} alt={feature.title} />
                </div>
                <div className="feature-text">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      );
    };
    
    export default FeatureSection;