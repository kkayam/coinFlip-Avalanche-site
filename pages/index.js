import Layout from '../components/layout/Layout'
import HomeView from '../views/home/HomeView'

export default function Home() {
  return (
    <Layout
      pageTitle="CoinFlip | Koray"
      pageDescription="Flip coins on Avalanche"
    >
      <HomeView />
    </Layout>
  )
}
