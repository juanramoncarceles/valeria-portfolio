import React from "react";
import { graphql } from "gatsby";
import { useIntl, Link } from "gatsby-plugin-intl";
import Img from "gatsby-image";

import Layout from "../components/layout";

import aboutStyles from "./about.module.css";

import background from "../images/about-img.jpg";

const About = ({ data: { file } }) => {
  const { formatMessage } = useIntl();

  return (
    <Layout
      pageTitle={formatMessage({ id: "about.title" })}
      fullHeightHeading={{ bgimg: background }}
    >
      <div className={aboutStyles.pageContainer}>
        <section className={aboutStyles.aboutContainer}>
          <Img
            fluid={file.sharp.fluid}
            className={aboutStyles.profilePic}
            alt="Valeria Lovato's profile picture."
          />
          <p className={aboutStyles.personalDescription}>
            {formatMessage({ id: "about.description" })}
          </p>
        </section>

        <section>
          <h2 className={aboutStyles.cvTitle}>curriculum vitae</h2>

          <section className={aboutStyles.cvSection}>
            <h3 className={aboutStyles.cvSubtitle}>education</h3>

            <article className={aboutStyles.cvItemWrapper}>
              <div className={aboutStyles.leftItem}>
                <span>2018 - 2019</span>
              </div>
              <div className={aboutStyles.rightItem}>
                <h5>UOC-Universitat Oberta de Catalunya</h5>
                <h6>Barcelona, Spain</h6>
                <p>Web Design Postgraduate diploma</p>
              </div>
            </article>

            <article className={aboutStyles.cvItemWrapper}>
              <div className={aboutStyles.leftItem}>
                <span>2013 - 2016</span>
              </div>
              <div className={aboutStyles.rightItem}>
                <h5>Politecnico di Milano</h5>
                <h6>Milan, Italy</h6>
                <p>Master degree</p>
              </div>
            </article>

            <article className={aboutStyles.cvItemWrapper}>
              <div className={aboutStyles.leftItem}>
                <span>2009 - 2012</span>
              </div>
              <div className={aboutStyles.rightItem}>
                <h5>IUAV Università di Venezia</h5>
                <h6>Venice, Italy</h6>
                <p>Bachelor degree</p>
              </div>
            </article>
          </section>

          <section className={aboutStyles.cvSection}>
            <h3 className={aboutStyles.cvSubtitle}>working experience</h3>

            <article className={aboutStyles.cvItemWrapper}>
              <div className={aboutStyles.leftItem}>
                <span>2018 - 2020</span>
              </div>
              <div className={aboutStyles.rightItem}>
                <h5>Estudi Pep Boada - Hostalric, Spain</h5>
                <h6>Architect</h6>
                <ul>
                  <li>
                    Project monitoring from the conceptualization to the
                    construction phase.
                  </li>
                  <li>
                    Technical drawings, installations blueprints, 3D modelling,
                    rendering and mockups.
                  </li>
                  <li>Design of details and constructive solutions.</li>
                  <li>Budgeting and project measurements.</li>
                  <li>
                    Meeting with clients and presentation of the proposal.
                  </li>
                  <li>Assistance on the work site.</li>
                  <li>Management of contacts with providers.</li>
                  <li>Energy certificate and certificate of habitability.</li>
                </ul>
              </div>
            </article>

            <article className={aboutStyles.cvItemWrapper}>
              <div className={aboutStyles.leftItem}>
                <span>2017 - 2018</span>
              </div>
              <div className={aboutStyles.rightItem}>
                <h5>Carles Enrich - Barcelona, España</h5>
                <h6>Architect</h6>
                <ul>
                  <li>
                    Participation in conceptualization, preliminary design,
                    basic design and construction phase
                  </li>
                  <li>
                    Participation in the Master Plan of Rec Comtal for the City
                    Hall of Barcelona
                  </li>
                  <li>Design of details and constructive solutions.</li>
                  <li>Participation in international architecture contests</li>
                  <li>
                    Development of 2D and 3D graphic material and renderings.
                  </li>
                </ul>
              </div>
            </article>

            <article className={aboutStyles.cvItemWrapper}>
              <div className={aboutStyles.leftItem}>
                <span>2016 - 2017</span>
              </div>
              <div className={aboutStyles.rightItem}>
                <h5>Studio Pekka / Archi3o - 's-Hertogenbosch, Netherlands</h5>
                <h6>Architecture internship</h6>
                <ul>
                  <li>
                    Participation in the schematic design and design development
                    phases
                  </li>
                  <li>
                    Assistance in a participative design for a co-housing
                    project
                  </li>
                  <li>
                    Development of 2D and 3D graphic material with BIM software
                  </li>
                  <li>
                    Video editing for the publication of the book “Goodbye
                    Architecture - The architecture of Crematoria in Europe”
                  </li>
                </ul>
              </div>
            </article>
          </section>

          <section className={aboutStyles.cvSection}>
            <h3 className={aboutStyles.cvSubtitle}>language skills</h3>

            <article className={aboutStyles.cvItemWrapper}>
              <div className={aboutStyles.leftItem}>
                <span>native</span>
              </div>
              <div className={aboutStyles.rightItem}>
                <p>Italian</p>
              </div>
            </article>

            <article className={aboutStyles.cvItemWrapper}>
              <div className={aboutStyles.leftItem}>
                <span>other languages</span>
              </div>
              <div className={aboutStyles.rightItem}>
                <p>
                  Spanish, English, Catalan, Portugues (intermediate), French
                  (beginner)
                </p>
              </div>
            </article>

            <article className={aboutStyles.cvItemWrapper}>
              <div className={aboutStyles.leftItem}>
                <span>certificates</span>
              </div>
              <div className={aboutStyles.rightItem}>
                <p>IELTS Advanced</p>
                <p>Curso de español Escuela San Pablo CEU: C1</p>
              </div>
            </article>
          </section>

          <section className={aboutStyles.cvSection}>
            <h3 className={aboutStyles.cvSubtitle}>technical skills</h3>

            <article className={aboutStyles.cvItemWrapper}>
              <div className={aboutStyles.leftItem}>
                <span>digital modeling</span>
              </div>
              <div className={aboutStyles.rightItem}>
                <p>Archicad, Rhinoceros, Sketchup Pro</p>
              </div>
            </article>

            <article className={aboutStyles.cvItemWrapper}>
              <div className={aboutStyles.leftItem}>
                <span>rendering</span>
              </div>
              <div className={aboutStyles.rightItem}>
                <p>Vray for Rhinoceros / Sketchup, Artlantis Studio</p>
              </div>
            </article>

            <article className={aboutStyles.cvItemWrapper}>
              <div className={aboutStyles.leftItem}>
                <span>graphics</span>
              </div>
              <div className={aboutStyles.rightItem}>
                <p>Photoshop, Illustrator, Indesign, Premiere Pro</p>
              </div>
            </article>

            <article className={aboutStyles.cvItemWrapper}>
              <div className={aboutStyles.leftItem}>
                <span>others skills</span>
              </div>
              <div className={aboutStyles.rightItem}>
                <p>Photography, web design</p>
              </div>
            </article>
          </section>
          <a
            download="Valeria Lovato - Curriculum vitae"
            className={aboutStyles.downloadCv}
            href="/pdf/valeria-lovato-cv.pdf"
          >
            download cv
          </a>
        </section>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query {
    file(relativePath: { eq: "profile-pic.png" }) {
      sharp: childImageSharp {
        fluid(maxWidth: 360) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

export default About;
