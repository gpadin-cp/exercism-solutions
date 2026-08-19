function getProduct(input: number[], i: number, span: number) {
  const product = input.reduce((acc, curr) => acc * curr, 1)
  return product
}

export const largestProduct = (input: string, span: number) => {
  // basic validation
  if (span < 0) throw new Error("Span must not be negative")
  if (span > input.length) throw new Error("Span must not exceed string length")
  // convert string to array of numbers, checking for invalid characters while we go. Throw at the first invalid one found
    const formattedInput = [...input].map(x => {
      if (Number.isNaN(Number(x))) {
        throw new Error("Digits input must only contain digits")
      }
      return Number(x)
    })

  let currentMax = 0
  // need to stop at the last (span)th index because 00000008 would incorrectly treat [8] as the last span when it should be [0,8] which means 0
  for (let i = 0; i < formattedInput.length - span + 1; i++) {
    let currentTriplet = getProduct(formattedInput.slice(i,i + span), i, span)
    if (currentTriplet > currentMax) {
      currentMax = currentTriplet
    }
  }
  return currentMax
}
