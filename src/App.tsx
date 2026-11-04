
import Header from './components/Header'
import Hero from './components/Hero'
import DemoNotice from './components/DemoNotice'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <DemoNotice />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
