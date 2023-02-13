import Image from 'next/image'
import { useState } from 'react'
import Search from '../Search/Search'
const Header = () => {
	const [search, setSearch] = useState(false)
	return (
		<header>
			{search ? null : (
				<>
					<h1>
						sp
						<Image src='/Logo.png' alt='spIT!' width={64} height={64} />!
					</h1>
					<br />
				</>
			)}
			<Search setSearch={setSearch} />
		</header>
	)
}

export default Header
