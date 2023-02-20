// @ts-nocheck
import "../assets/images/icon/svg/index";

const SvgIcon = ({
  name,
  color,
  ...props
}) => {
  const symbolId = `#icon-${name}`
  return (
    <svg {...props} aria-hidden="true">
      <use href={symbolId} fill={color || 'currentColor'} />
    </svg>
  )
}

export default SvgIcon