import React from 'react'

const Link = ({className,href,children}) =>{
    const onLinkClick = (e) => {
        if (e.metaKey || e.ctrlKey){
            return
        }

        e.preventDefault()
        window.history.pushState({},'',href)
        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
    }
    return(
        <a className={className} href={href} onClick={e => onLinkClick(e)}>{children}</a>
    )
}

export default Link