'use strict'

const mod = (num, by) => (num % by + Math.abs(by)) % by

const divmod = (num, by) => ({
	div: Math [
		by > 0 ? 'floor' : 'ceil'
	] (num / by),
	mod: mod (num, by)
})

const mulmod = (num, by) => ({
	mul: (num * by) % 1,
	mod: Math.floor ((num * by))
})

const toBase = (div, base) => {
	let point = 0
	const result = []
	let afterpoint = div
	while (afterpoint % 1) {
		afterpoint *= base
		point ++
	}
	div *= base ** point
	while (div != 0) {
		({div, mod} = divmod (div, base))
		result.push (mod)
	}
	return result.map (x => x.toString (36)).reverse ().join('')
}
