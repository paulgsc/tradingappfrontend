
import {
  AlertTriangle,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Command,
  CreditCard,
  File,
  FileText,
  Github,
  HelpCircle,
  Image,
  Loader2,
  MoreVertical,
  Pizza,
  Plus,
  Settings,
  Trash,
  Twitter,
  User,
  X,
} from "lucide-react"
import { FaHome, FaMoneyCheck } from 'react-icons/fa';
import { CiLogin } from 'react-icons/ci';
import RoofingIcon from '@mui/icons-material/Roofing';
import GridViewIcon from '@mui/icons-material/GridView';
import { GoogleButton } from 'react-google-button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import KeyIcon from '@mui/icons-material/Key';
import LogoutIcon from '@mui/icons-material/Logout';
import BrushIcon from '@mui/icons-material/Brush';
import HistoryIcon from '@mui/icons-material/History';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ShowChartIcon from '@mui/icons-material/ShowChart';

export const Icons = {
    bank: AccountBalanceIcon,
    chevronLeft: ChevronLeft,
    chevronRight: ChevronRight,
    chart: ShowChartIcon,
    faHome: FaHome,
    logout: LogoutIcon,
    logo: Command,
    close: X,
    spinner: Loader2,
    trash: Trash,
    post: FileText,
    page: File,
    media: Image,
    settings: Settings,
    billing: CreditCard,
    ellipsis: MoreVertical,
    add: Plus,
    warning: AlertTriangle,
    user: User,
    arrowRight: ArrowRight,
    help: HelpCircle,
    pizza: Pizza,
    twitter: Twitter,
    check: Check,
    roof: RoofingIcon,
    googleButton: GoogleButton,
    gridView: GridViewIcon,
    accountIcon: AccountCircleIcon,
    notification: NotificationsIcon,
    securityKey: KeyIcon,
    brush: BrushIcon,
    history: HistoryIcon,
}