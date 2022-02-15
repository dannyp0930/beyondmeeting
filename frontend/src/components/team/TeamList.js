import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'
import {
  Grid,
  List,
  ListItem,
  ListItemButton,
} from '@mui/material';
import { getCurrentUser } from '../../util/APIUtils';
import CreateTeam from './CreateTeam';

export function TeamList() {
  const [user, setUser] = useState('');
  const [teams, setTeams] = useState(null);
  const [reLoad, setReload] = useState(true);

  useEffect(() => {
    getCurrentUser()
    .then(response => {
      setUser(response);
      setReload(false);
    }).catch(error => {
      console.log(error);
    }); 
  }, [reLoad]);
  
  useEffect(() => {
    if (user)
      setTeams(user.userHasTeamList.map((data) => {
        const url = `${data.team.id}`
        return (
          <NavLink
            key={data.team.id}
            to={url}
            id={data.team.id}
            state={{data: data}}
          >
            <ListItem>
              <ListItemButton>
                {data.team.teamName}
              </ListItemButton>
            </ListItem>
          </NavLink>
        )}));
  }, [user]);

  return (
    <Grid container
      spacing={2}
    >
      <CreateTeam
        setReload={setReload}
      />
      <Grid
        item xs={4}
        container
        direction={'column'}
      >
        <Grid item>
          <List>
            {teams}
          </List>
        </Grid>
      </Grid>
    </Grid>
  );
};
