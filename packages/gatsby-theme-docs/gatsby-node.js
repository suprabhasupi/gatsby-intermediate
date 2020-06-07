const path = require('path');
const fs = require("fs")
const mkdirp = require("mkdirp")
const withDefaults = require('./utils/default-options')

// using a node-hook called onPreBootstrap, which will get us into the Gatsby API
// inside this, using gatsby store which is info about running program.
// option will be theme options
exports.onPreBootstrap = ({store}, options) => {
    const {program} = store.getState();
    const {contentPath} = withDefaults(options);
    const dir = path.join(program.directory, contentPath);
    if(!fs.existsSync(dir)) {
        // create the dir
        // it should happen before moving to next API, that why using sync
        mkdirp.sync(dir);
    }
}

// Need to hook into schema cutomization
exports.createSchemaCustomization = ({actions}) => {
    actions.createTypes(`
        type DocsPage implements Node @dontInfer {
            id: ID!
            title: String!
            path: String!
            updated: Date! @dateformat
            body: String!
        }
    `)
}

// 
exports.onCreateNode = ({node, actions, getNode, createNodeId}, options) => {
    const {basePath} = withDefaults(options);
    const parent = getNode(node.parent);

    if(node.internal.type !== 'Mdx' || parent.sourceInstanceName !== 'gatsby-theme-docs') {
        return;
    }
    // treat index.mdx link index.html (i.e. 'docs' vs docs/index/)
    // if the file is index.mdx then it will be docs/ or file if about.mdx then the it will be docs/about/
    const pageName = parent.name !== 'index' ? parent.name : ''

    actions.createNode({
        id: createNodeId(`DocsPage-${node.id}`),
        title: node.frontmatter.title || parent.name,
        updated: parent.modifiedTime,
        // it will give the path in directory hirerachy wise ex.: doc/aboutUs
        path: path.join('/', basePath, parent.relativeDirectory, pageName),
        parent: node.id,
        internal: {
            type: 'DocsPage',
            contentDigest: node.internal.contentDigest
        }
    })

}

exports.createResolvers = ({createResolvers}) => {
    createResolvers({
        DocsPage: {
            body: {
                type: 'String!',
                resolve: (source, args, context, info) => {
                    // load the resolver for MDX type (body field)
                    const type = info.schema.getType('Mdx');
                    // type will load all MDX data
                    const mdxFields = type.getFields();
                    // mdxFiled will give us the body fields
                    const resolver = mdxFields.body.resolve
                    // this resolve is same as above resolve, reolve the body type exactly same as reolve MDX node request to th ebody type.
                    const mdxNode = context.nodeModel.getNodeById({id: source.parent})
                    return resolver(mdxNode, args, context, {
                        fieldName: 'body'
                    })
                } 
            }
        }
    })
}

exports.createPages = async ({actions, graphql, reporter}) => {
    const result = await graphql(`
        query {
            allDocsPage {
                nodes {
                    id
                    path
                }
            }
        }
    `)

    if(result.error) {
        reporter.panic('error loading docs', error)
    }

    const pages = result.data.allDocsPage.nodes;
    pages.forEach(page => {
        actions.createPage({
            path: page.path,
            component: require.resolve('./src/templates/docs-page-template'),
            context: {
                pageID: page.id
            }
        })
    })
}