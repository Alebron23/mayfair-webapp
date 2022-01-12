export const email =
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
export const zipCode = /(^\d{5}$)|(^\d{5}-\d{4}$)/
export const cityName =
  /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/
export const ssn = /^\d{7}$/
export const passwordReg =
  /^.*(?=.{4,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/
