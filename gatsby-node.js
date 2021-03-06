const path = require('path');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    return graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              html
              frontmatter {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: `/post${node.frontmatter.slug}`,
          component: path.resolve('./src/components/postLayout.js'),
          context: {
            slug: node.frontmatter.slug
          }
        });
      });
      resolve();
    });
  });
};
