import { GraduationCap, TvMinimalPlay } from 'lucide-react'
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { AuthContext } from '@/context/auth-context'

const StudentViewCommonHeader = () => {
  const navigate = useNavigate();
   const { resetCredentials } = useContext(AuthContext);
  const handleLogOut = () => {
    resetCredentials();
    sessionStorage.clear();
  }
  return (
    <header className="flex items-center justify-between  p-4 border-b-gray-300 relative">
      <div className="flex items-center space-x-2">
        <Link to={"/home"} className="flex items-center">
          <GraduationCap className="h-8 w-8 mr-1.5" />
          <span className="font-bold mr-1.5">|</span>
          <span className="font-extrabold md:text-xl text-[14px] tracking-wider">
            Learn
          </span>
        </Link>
        <div>
          <Button
            variant="ghost"
            className="text-[14px] md:text-[16px] font-medium cursor-pointer"
            onClick={() => navigate("/courses")}
          >
            Explore Courses
          </Button>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="font-semibold hover:bg-gray-300 border-gray-400"
          >
            My Courser
          </Button>
          <TvMinimalPlay className="w-7 h-7 font-extrabold cursor-pointer" />
          <Button
            variant="destructive"
            className="cursor-pointer"
            onClick={handleLogOut}
          >
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  );
}

export default StudentViewCommonHeader