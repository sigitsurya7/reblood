export const Card = ({children, title, button, color}) => {
    function renderButton(){
        return button ? button.map((btn, index) => {
            return(
                <>
                    <button type="button" className={`btn btn-md w-max btn-${color ? color[index] : 'btn-primary'} capitalize`}>
                        {btn}
                    </button>
                </>
            )
        }) : []
    }
    
    return(
        <div className="w-full bg-base-100 p-4 rounded-md flex flex-col flex-wrap gap-4">
            <h1 className="text-2xl capitalize">{title}</h1>

            <main>
                {children}
            </main>

            <div className="flex justify-end gap-4">
                {renderButton()}
            </div>
        </div>
    )
}