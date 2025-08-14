import { useSelector } from "react-redux";
import {
  fetchAnnouncements,
  addAnnouncement,
  editAnnouncement,
  removeAnnouncement,
} from "../store/slices/announcementSlice";
import AnnouncementForm from "../components/AnnouncementForm";
import ResourcePage from "../components/ResourcePage";

export default function Announcements() {
  const announcementsState = useSelector((s) => s.announcements);

  return (
    <ResourcePage
      title="Announcements"
      resourceState={announcementsState}
      fetchAction={fetchAnnouncements}
      createAction={addAnnouncement}
      editAction={editAnnouncement}
      removeAction={removeAnnouncement}
      FormComponent={AnnouncementForm}
    />
  );
}
