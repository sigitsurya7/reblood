export const Card = ({children, title, button, color, click}) => {
    function renderButton(){
        return button ? button.map((btn, index) => {
            return(
                <button key={index} type="button" className={`btn ${button.length == '1' ? 'btn-block' : 'btn-md'} btn-${color ? color[index] : 'btn-primary'} capitalize`} onClick={click ? click[index] : ''}>
                    {btn}
                </button>
            )
        }) : []
    }
    
    return(
        <div className="w-full bg-base-100 p-4 rounded-2xl flex flex-col flex-wrap gap-8">
            <h1 className="text-2xl capitalize">{title}</h1>

            <main>
                {children}
            </main>

            <div className="flex justify-end gap-4 w-full">
                {renderButton()}
            </div>
        </div>
    )
}