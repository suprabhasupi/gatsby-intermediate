/** @jsx jsx */
import {jsx} from 'theme-ui'
import {preToCodeBlock} from 'mdx-utils'
import Highlight, {defaultProps} from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/nightOwl'
import {LiverProvider, LiveEditor, LiveError, LivePreview, LiveProvider} from 'react-live'
import scope from '../scope'

const Code = props => {
    // what language is preblock is using
    const codeProps = preToCodeBlock(props)
    // if we didn;t get any code props then its not a highlight code
    if(!codeProps) {
        return <pre {...props} />
    }

    const {codeString, language} = codeProps;
    return codeProps['react-live'] ? (
        <LiveProvider code={codeString} scope={scope} theme={theme}>
            <LiveEditor />
            <LiveError />
            <LivePreview 
                sx={{
                    border: theme => `1px solid ${theme.colors.muted}`,
                    p: 4,
                    'div :first-child': {
                        mt: 0
                    },
                    variant: 'react-live'
                }}
            />
        </LiveProvider>
        ) : (
       <Highlight
        {...defaultProps}
        code={codeString}
        language={language}
        theme={theme}
       >
           {/* it uses the render props pattern, so we get a function back */}
           {({className, style, tokens, getLineProps, getTokenProps}) => (
            <pre
                className={className}
                style={style}
                sx={{p:2, overflowX: 'scroll', variant: 'prism-highlight'}}
            >
                {tokens.map((line,i) => (
                    <div {...getLineProps({line, key: i})}>
                        {line.map((token,key) => (
                            // <p>hge</p>
                            <span {...getTokenProps({token,key})} />
                        ))}
                    </div>
                ))}
            </pre>
           )}
       </Highlight> 
    )
}

export default Code