interface SidebarLogoProps {
    logo: string
}

export const SidebarLogo: React.FC<SidebarLogoProps> = ({ logo }) => {
    return (
        <div className="sidebar-logo">
            <img src={logo} alt="Logo" />
            <h1>My Website</h1>
        </div>
    )
}