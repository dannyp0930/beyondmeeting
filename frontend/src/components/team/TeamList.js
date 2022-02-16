import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'
import {
  Card,
  CardContent,
  Grid,
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
          <Grid
            key={data.team.id}
            item xs={4}
            sx={{p:2}}
          >
            <Card>
              <CardContent>
                <NavLink
                  to={url}
                  id={data.team.id}
                  state={{data: data}}
                >
                  {data.team.teamName}
                </NavLink>
              </CardContent>
            </Card>
          </Grid>
        )}));
  }, [user]);

  return (
    <Grid
      container
      spacing={2}
    >
      <Grid item xs={12}>
        <CreateTeam
          setReload={setReload}
        />
      </Grid>
      <Grid item
        container
        xs={12}
      >
        {teams}
      </Grid>
    </Grid>
  );
};
