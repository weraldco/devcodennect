import { FC } from 'react';
import { FaJava, FaReact } from 'react-icons/fa';
import { HiQuestionMarkCircle } from 'react-icons/hi';
import { IoLogoCss3, IoLogoHtml5, IoLogoJavascript } from 'react-icons/io';
import {
	SiBootstrap,
	SiCplusplus,
	SiCsswizardry,
	SiDotnet,
	SiGo,
	SiLess,
	SiMongodb,
	SiMysql,
	SiNextdotjs,
	SiPhp,
	SiPostgresql,
	SiPython,
	SiRust,
	SiSass,
	SiSharp,
	SiTailwindcss,
	SiTypescript,
} from 'react-icons/si';

const iconMap = [
	{ id: 'css3', icon: IoLogoCss3 },
	{ id: 'css', icon: SiCsswizardry },
	{ id: 'html5', icon: IoLogoHtml5 },
	{ id: 'javascript', icon: IoLogoJavascript },
	{ id: 'java', icon: FaJava },
	{ id: 'react', icon: FaReact },
	{ id: 'c++', icon: SiCplusplus },
	{ id: 'boothstrap', icon: SiBootstrap },
	{ id: 'c-sharp', icon: SiSharp },
	{ id: 'dotNet', icon: SiDotnet },
	{ id: 'go', icon: SiGo },
	{ id: 'less', icon: SiLess },
	{ id: 'mongodb', icon: SiMongodb },
	{ id: 'mysql', icon: SiMysql },
	{ id: 'postgresql', icon: SiPostgresql },
	{ id: 'php', icon: SiPhp },
	{ id: 'python', icon: SiPython },
	{ id: 'nextjs', icon: SiNextdotjs },
	{ id: 'rust', icon: SiRust },
	{ id: 'sass', icon: SiSass },
	{ id: 'tailwind', icon: SiTailwindcss },
	{ id: 'typescript', icon: SiTypescript },
	{ id: 'bootstrap', icon: SiBootstrap },
] as const;

// type IconId = (typeof iconMap)[number]['id'];

type Props = {
	id: string;
};

const SkillIcon = ({ id }: Props) => {
	const currIcon = iconMap.find((i) => i.id === id);

	if (!currIcon) return <HiQuestionMarkCircle size={30} />;
	const Icon = currIcon.icon;
	return <Icon size={30} />;
};

export default SkillIcon;
