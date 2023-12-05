function ButtonSecondary({ onClick, shopState, isBusy = false }) {
  return (
    <button onClick={onClick} disabled={isBusy} className="swp-btn-secondary">
      {isBusy ? shopState.t.l.loading : shopState.t.l.seeMore}
    </button>
  )
}

export default ButtonSecondary
