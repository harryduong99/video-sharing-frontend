import { clx } from "@/utils/helpers";

interface Props {
  className?: string;
}

const Footer: React.FC<Props> = ({ className }) => {
  return (
    <div className={clx("absolute bottom-0 w-full", className)}>
      <footer className={clx("footer container mx-auto relative", className)}>

      </footer>
    </div>
  );
};

export default Footer;
