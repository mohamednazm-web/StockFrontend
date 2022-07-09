import React, { useState } from "react"
import PropTypes from "prop-types"

import { connect } from "react-redux"

// Import menuDropdown
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu"

//i18n
import { withTranslation } from "react-i18next"

const Header = props => {
  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <button
              type="button"
              className="btn btn-sm me-2 font-size-24 d-lg-none header-item waves-effect waves-light"
            >
              <i className="mdi mdi-menu" />
            </button>
          </div>
          <div className="d-flex">
            <div className="mt-4">user name</div>
            <ProfileMenu />
          </div>
        </div>
      </header>
    </React.Fragment>
  )
}

Header.propTypes = {
  leftMenu: PropTypes.any,
  t: PropTypes.any,
}

const mapStatetoProps = state => {
  const { layoutType, showRightSidebar, leftMenu } = state.Layout
  return { layoutType, showRightSidebar, leftMenu }
}

export default connect(mapStatetoProps, {})(withTranslation()(Header))
