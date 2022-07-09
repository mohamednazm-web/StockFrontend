import React, { useState } from "react"
import PropTypes from "prop-types"


const Breadcrumb = props => {
  const [setting_Menu, setsetting_Menu] = useState(false)

  return <></>
}

Breadcrumb.propTypes = {
  breadcrumbItem: PropTypes.string,
  title: PropTypes.string,
}

export default Breadcrumb
