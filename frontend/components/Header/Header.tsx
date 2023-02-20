import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import Search from '../Search/Search'
import styles from './Header.module.css'

const useHeightAnimation = () => {
	const titleRef = useRef<HTMLDivElement>(null)
	const [initialisedHeight, setInitialisedHeight] = useState(false)

	useEffect(() => {
		if (!titleRef.current) return
		titleRef.current.style.setProperty(
			'--maxHeight',
			titleRef.current.getBoundingClientRect().height + 'px'
		)
		setInitialisedHeight(true)
	}, [])

	return { titleRef, initialisedHeight }
}

const Header = () => {
	const [search, setSearch] = useState(false)
	const { titleRef, initialisedHeight } = useHeightAnimation()

	return (
		<header>
			<div
				ref={titleRef}
				className={
					// I don't like this ternary, but it works. FIX: Refactor
					initialisedHeight
						? search
							? styles.titleHidden
							: styles.titleShown
						: ''
				}>
				<h1>
					sp
					<Image src='/Logo.png' alt='spIT!' width={64} height={64} />!
				</h1>
				<br />
			</div>
			<Search setSearch={setSearch} />
		</header>
	)
}

export default Header
