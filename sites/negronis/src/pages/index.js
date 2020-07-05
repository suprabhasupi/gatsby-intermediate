/** @jsx jsx */
import {jsx} from 'theme-ui'
import { graphql, Link } from 'gatsby';
import Image from 'gatsby-image'
import Layout from '../components/layout'

export const query = graphql`
query {
  image: file(name: {eq: "negroni"}) {
    cloudinary: childCloudinaryAsset {
      fluid(transformations: ["ar_18:9", "c_fill", "g_auto:subject"]) {
        ...CloudinaryAssetFluid
      }
    }
}
}
`

const Index = ({data}) => (
  <Layout>
    <Image fluid={data.image.cloudinary.fluid} alt='negroni' />
    <h1>Negronis: A Love Story</h1>
    <p>
      A Negroni, while simple, is a beautifully complex cocktail with endless
      opportunities to experiment with flavors.
    </p>
    <Link to="/recipes" sx={{variant: 'button.primary'}}>recipe </Link>
    <Link to="/history" sx={{variant: 'button.hollow', ml:3}}>Learn the History</Link>
    <Link to="/events" sx={{variant: 'button.hollow', ml:3}}>Upcoming events</Link>
  </Layout>
);

export default Index;
