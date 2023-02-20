import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import Search from '../Search/Search'
import styles from './Header.module.css'

const useHeightAnimation = () => {
	const heightRef = useRef<HTMLDivElement>(null)
	const [initialisedHeight, setInitialisedHeight] = useState(false)

	useEffect(() => {
		if (!heightRef.current) return
		heightRef.current.style.setProperty(
			'--maxHeight',
			heightRef.current.getBoundingClientRect().height + 'px'
		)
		setInitialisedHeight(true)
	}, [])

	return { heightRef, initialisedHeight }
}

const Header = () => {
	const [search, setSearch] = useState(false)
	const { heightRef, initialisedHeight } = useHeightAnimation()

	return (
		<header>
			<div
				ref={heightRef}
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
