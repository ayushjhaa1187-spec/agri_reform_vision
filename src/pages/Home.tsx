import Hero from '../components/Hero';
import ExecutiveSummary from '../components/ExecutiveSummary';
import Impact from '../components/Impact';
import Solution from '../components/Solution';

export default function Home() {
  return (
    <>
      <Hero onNavigate={(section) => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }} />
      <ExecutiveSummary />
      <Solution />
      <Impact />
    </>
  );
}
