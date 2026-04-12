const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-border py-10">
      <div className="max-w-7xl mx-auto px-8 md:px-16 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} DMZ DATA AS</span>
        <span>Org.nr 983 904 068 MVA · Farmannvegen 20B, 3925 Porsgrunn</span>
      </div>
    </footer>
  );
};

export default Footer;
