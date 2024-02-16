import AddButton from "../assets/addbutton"


const Navbar = () => {
  return (
    <nav className="relative flex items-center justify-between w-full px-4 py-3 mx-2 mt-6 bg-white border border-gray-200 rounded-xl md:py-0 md:px-6 lg:px-8 xl:mx-auto ">
      <div className="flex items-center justify-between">
        <a className="flex-none text-xl font-semibold " href="#" >Todo App</a>
        
      </div>
     
        <div>
        <AddButton/>
          
        </div>
    </nav>
  )
}

export default Navbar