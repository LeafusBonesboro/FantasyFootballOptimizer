from flask import Blueprint, jsonify, session, redirect, url_for, request
from requests_oauthlib import OAuth2Session
from tokens import load_token
import config

teams_bp = Blueprint('teams', __name__)

@teams_bp.route('/my_team', methods=['GET'])
def get_my_team_and_players():
    token = load_token()
    if not token:
        return redirect(url_for('auth.login'))

    yahoo = OAuth2Session(config.CLIENT_ID, token=token)

    # Fetch the current user's team
    response = yahoo.get('https://fantasysports.yahooapis.com/fantasy/v2/users;use_login=1/games;game_keys=449/teams?format=json')

    if response.status_code != 200:
        return jsonify({"error": "Unable to fetch user's team", "status_code": response.status_code})

    data = response.json()

    # Access the user's teams
    teams = data['fantasy_content']['users']['0']['user'][1]['games']['0']['game'][1]['teams']

    # Store the team and its players
    teams_with_players = []

    for team_key, team_data in teams.items():
        if team_key == 'count':
            continue  # Skip the count key

        # Properly access the team details
        team = team_data['team'][0]
        team_name = team[2]['name']
        team_key = team[0]['team_key']

        # Fetch players for the current user's team
        players_response = yahoo.get(f'https://fantasysports.yahooapis.com/fantasy/v2/team/{team_key}/roster?format=json')
        if players_response.status_code != 200:
            return jsonify({"error": f"Unable to fetch players for team {team_name}", "status_code": players_response.status_code})

        players_data = players_response.json()
        players = players_data['fantasy_content']['team'][1]['roster']['0']['players']

        # Extract player names
        player_list = []
        for player_key, player_info in players.items():
            if player_key == 'count':
                continue  # Skip the count key
            player_name = player_info['player'][0][2]['name']['full']
            player_list.append(player_name)

        # Append the team and its players to the list
        teams_with_players.append({
            "team_name": team_name,
            "players": player_list
        })

    # Return the current user's team and players as JSON
    return jsonify(teams_with_players)

@teams_bp.route('/all_teams', methods=['GET'])
def get_all_teams_and_players():
    token = load_token()
    if not token:
        return redirect(url_for('auth.login'))

    yahoo = OAuth2Session(config.CLIENT_ID, token=token)

    # Fetch all teams in the league
    league_key = '449.l.227774'  # Replace with your league key
    response = yahoo.get(f'https://fantasysports.yahooapis.com/fantasy/v2/league/{league_key}/teams?format=json')

    if response.status_code != 200:
        return jsonify({"error": "Unable to fetch league teams", "status_code": response.status_code})

    data = response.json()

    # Access the teams data from the league
    teams = data['fantasy_content']['league'][1]['teams']

    # Store all teams and their players
    all_teams_with_players = []

    # Loop through each team and fetch its players
    for team_key, team_data in teams.items():
        if team_key == 'count':
            continue  # Skip the count key

        # Properly access the team details from the list
        team = team_data['team'][0]
        team_name = team[2]['name']
        team_key = team[0]['team_key']

        # Fetch the players for this team
        players_response = yahoo.get(f'https://fantasysports.yahooapis.com/fantasy/v2/team/{team_key}/roster?format=json')
        if players_response.status_code != 200:
            return jsonify({"error": f"Unable to fetch players for team {team_name}", "status_code": players_response.status_code})

        players_data = players_response.json()
        players = players_data['fantasy_content']['team'][1]['roster']['0']['players']

        # Extract player names
        player_list = []
        for player_key, player_info in players.items():
            if player_key == 'count':
                continue  # Skip the count key
            player_name = player_info['player'][0][2]['name']['full']
            player_list.append(player_name)

        # Append the team and its players to the list
        all_teams_with_players.append({
            "team_name": team_name,
            "players": player_list
        })

    # Return all teams with their players as JSON
    return jsonify(all_teams_with_players)

